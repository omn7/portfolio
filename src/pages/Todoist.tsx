import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Plus, Trash2, Check, Calendar as CalendarIcon, DollarSign,
  ChevronLeft, ChevronRight, LogOut, ArrowLeft, Loader2,
  ListTodo, CalendarDays, CalendarRange, Wallet, X,
  TrendingUp, TrendingDown, Edit2, Save, Moon, Sun,
  Cake, StickyNote, Gift, Search, Pin, PinOff, Tag, Circle,
  Sparkles, RotateCcw, Copy, CheckCheck,
  PanelLeftClose, PanelLeftOpen, LayoutDashboard, Clock,
  Share2, Globe, Link as LinkIcon, ExternalLink,
  Bold, Italic, Underline, Link2, Type
} from "lucide-react";
import { differenceInDays, setYear, isPast } from "date-fns";
import { useDark } from "@/components/Layout";
import {
  format, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths,
  addWeeks, subWeeks, isToday, getMonth, getDate, parseISO
} from "date-fns";
import { v4 as uuidv4 } from "uuid";

// ─── Types ──────────────────────────────────────────────────────

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: "daily" | "weekly" | "monthly";
  date: string; // ISO date
  created_at: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  created_at: string;
}

interface Birthday {
  id: string;
  name: string;
  dob: string; // yyyy-MM-dd
  note: string;
  created_at: string;
}

type NoteTag = "none" | "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  tag: NoteTag;
  public: boolean;
  author_name?: string;
  created_at: string;
  updated_at: string;
}

const NOTE_TAGS: { key: NoteTag; label: string; color: string; bg: string; border: string }[] = [
  { key: "none",   label: "None",   color: "var(--text-alt)", bg: "transparent",          border: "var(--text)" },
  { key: "red",    label: "Red",    color: "#ef4444",         bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.3)" },
  { key: "orange", label: "Orange", color: "#f97316",         bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.3)" },
  { key: "yellow", label: "Yellow", color: "#eab308",         bg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.3)" },
  { key: "green",  label: "Green",  color: "#22c55e",         bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.3)" },
  { key: "blue",   label: "Blue",   color: "#3b82f6",         bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.3)" },
  { key: "purple", label: "Purple", color: "#a855f7",         bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.3)" },
  { key: "pink",   label: "Pink",   color: "#ec4899",         bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.3)" },
];

const getTagInfo = (tag: NoteTag) => NOTE_TAGS.find((t) => t.key === tag) || NOTE_TAGS[0];

const CARD_COLORS: Record<NoteTag, { bg: string; text: string; sub: string }> = {
  none:   { bg: "rgba(128,128,128,0.08)", text: "var(--text)",   sub: "var(--text-alt)" },
  red:    { bg: "#ef4444",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
  orange: { bg: "#f97316",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
  yellow: { bg: "#eab308",                text: "#1a1a1a",       sub: "rgba(0,0,0,0.5)" },
  green:  { bg: "#22c55e",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
  blue:   { bg: "#3b82f6",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
  purple: { bg: "#a855f7",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
  pink:   { bg: "#ec4899",                text: "#fff",          sub: "rgba(255,255,255,0.7)" },
};

type SidebarView = "dashboard" | "daily" | "weekly" | "monthly" | "finance" | "birthdays" | "notes";

// ─── Finance Categories ──────────────────────────────────────────

const EXPENSE_CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];
const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Gift", "Other"];

// ─── Main Component ─────────────────────────────────────────────

export default function Todoist() {
  const { user, loading, signOut } = useAuth();
  const [dark, setDark] = useDark();
  const [sidebarView, setSidebarView] = useState<SidebarView>("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [loadingData, setLoadingData] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Finance form state
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [financeDesc, setFinanceDesc] = useState("");
  const [financeAmount, setFinanceAmount] = useState("");
  const [financeType, setFinanceType] = useState<"income" | "expense">("expense");
  const [financeCategory, setFinanceCategory] = useState("Other");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Birthday form state
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [bdayName, setBdayName] = useState("");
  const [bdayDate, setBdayDate] = useState("");
  const [bdayNote, setBdayNote] = useState("");

  // Notes state
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteSearch, setNoteSearch] = useState("");
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [noteTagFilter, setNoteTagFilter] = useState<NoteTag | "all">("all");

  // AI rewrite state
  const [aiRewriting, setAiRewriting] = useState(false);
  const [aiRewriteResult, setAiRewriteResult] = useState<string | null>(null);
  const [aiCopied, setAiCopied] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const FONTS = [
    { label: "Mono", value: "'SF Mono', 'Fira Code', monospace" },
    { label: "Sans", value: "'Inter', 'Segoe UI', sans-serif" },
    { label: "Serif", value: "'Georgia', 'Times New Roman', serif" },
    { label: "Cursive", value: "'Dancing Script', cursive" },
    { label: "System", value: "system-ui, sans-serif" },
  ];

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const execFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Sync content back
    if (editorRef.current && activeNoteId) {
      updateNote(activeNoteId, { content: editorRef.current.innerHTML });
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      // Basic URL validation
      if (/^https?:\/\/.+/i.test(url)) {
        execFormat("createLink", url);
      } else {
        execFormat("createLink", "https://" + url);
      }
    }
  };

  // Sync contentEditable when switching notes
  useEffect(() => {
    if (editorRef.current && activeNoteId) {
      const note = notes.find((n) => n.id === activeNoteId);
      if (note) {
        editorRef.current.innerHTML = note.content || "";
      }
    }
  }, [activeNoteId]);

  // ─── AI Rewrite via Gemini ──────────────────────────────────

  const rewriteWithAI = async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note || (!note.content.trim() && !note.title.trim())) return;

    setAiRewriting(true);
    setAiRewriteResult(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setAiRewriteResult("Error: Gemini API key not configured.");
      setAiRewriting(false);
      return;
    }

    const textToRewrite = stripHtml(note.content.trim()) || note.title.trim();
    const prompt = `Rewrite the following text in a natural, human-like tone. Keep the same meaning and information but make it sound like a real person wrote it casually and naturally. Do not add any extra commentary, explanations, or formatting—just return the rewritten text directly:\n\n${textToRewrite}`;

    const models = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-pro"];

    const callModel = async (model: string) => {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
          }),
        }
      );
      return res;
    };

    try {
      // First pass: try each model
      for (const model of models) {
        const res = await callModel(model);
        if (res.status === 429 || res.status === 404) continue;
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API error ${res.status}: ${errText}`);
        }
        const data = await res.json();
        const rewritten = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        setAiRewriteResult(rewritten || "No result returned from AI.");
        return;
      }

      // All rate-limited — auto-retry the first model after 25s
      setAiRewriteResult(null);
      for (let s = 25; s > 0; s--) {
        setAiRewriteResult(`⏳ Rate-limited. Auto-retrying in ${s}s…`);
        await new Promise((r) => setTimeout(r, 1000));
      }
      setAiRewriteResult(null);

      const retryRes = await callModel(models[0]);
      if (!retryRes.ok) {
        const errText = await retryRes.text();
        throw new Error(retryRes.status === 429
          ? "Still rate-limited. Please wait a few minutes and try again."
          : `API error ${retryRes.status}: ${errText}`);
      }
      const retryData = await retryRes.json();
      const rewritten = retryData?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiRewriteResult(rewritten || "No result returned from AI.");
    } catch (err: any) {
      setAiRewriteResult(`Error: ${err.message}`);
    } finally {
      setAiRewriting(false);
    }
  };

  const applyAiRewrite = (noteId: string) => {
    if (!aiRewriteResult || aiRewriteResult.startsWith("Error:")) return;
    updateNote(noteId, { content: aiRewriteResult });
    if (editorRef.current) editorRef.current.innerHTML = aiRewriteResult;
    setAiRewriteResult(null);
  };

  const copyAiResult = () => {
    if (!aiRewriteResult) return;
    navigator.clipboard.writeText(aiRewriteResult);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  // ─── Data Loading ───────────────────────────────────────────

  const loadTodos = useCallback(async () => {
    if (!user || !supabase) return;
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setTodos(data);
  }, [user]);

  const loadTransactions = useCallback(async () => {
    if (!user || !supabase) return;
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    if (data) setTransactions(data);
  }, [user]);

  const loadBirthdays = useCallback(async () => {
    if (!user || !supabase) return;
    const { data } = await supabase
      .from("birthdays")
      .select("*")
      .eq("user_id", user.id)
      .order("dob", { ascending: true });
    if (data) setBirthdays(data);
  }, [user]);

  const loadNotes = useCallback(async () => {
    if (!user || !supabase) return;
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    if (data) setNotes(data);
  }, [user]);

  useEffect(() => {
    if (user) {
      Promise.all([loadTodos(), loadTransactions(), loadBirthdays(), loadNotes()]).then(() => setLoadingData(false));
    }
  }, [user, loadTodos, loadTransactions, loadBirthdays, loadNotes]);

  // ─── Live Clock ─────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ─── Todo CRUD ──────────────────────────────────────────────

  const addTodo = async () => {
    if (!newTodo.trim() || !user || !supabase) return;
    const todo: Todo & { user_id: string } = {
      id: uuidv4(),
      text: newTodo.trim(),
      completed: false,
      category: (sidebarView === "daily" || sidebarView === "weekly" || sidebarView === "monthly") ? sidebarView : "daily",
      date: format(selectedDate, "yyyy-MM-dd"),
      created_at: new Date().toISOString(),
      user_id: user.id,
    };
    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
    await supabase.from("todos").insert(todo);
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo || !supabase) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    await supabase.from("todos").update({ completed: !todo.completed }).eq("id", id);
  };

  const deleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (supabase) await supabase.from("todos").delete().eq("id", id);
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t)));
    setEditingId(null);
    if (supabase) await supabase.from("todos").update({ text: editText.trim() }).eq("id", id);
  };

  // ─── Transaction CRUD ──────────────────────────────────────

  const addTransaction = async () => {
    if (!financeDesc.trim() || !financeAmount || !user || !supabase) return;
    const tx: Transaction & { user_id: string } = {
      id: uuidv4(),
      description: financeDesc.trim(),
      amount: parseFloat(financeAmount),
      type: financeType,
      category: financeCategory,
      date: format(selectedDate, "yyyy-MM-dd"),
      created_at: new Date().toISOString(),
      user_id: user.id,
    };
    setTransactions((prev) => [tx, ...prev]);
    setFinanceDesc("");
    setFinanceAmount("");
    setShowFinanceForm(false);
    await supabase.from("transactions").insert(tx);
  };

  const deleteTransaction = async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (supabase) await supabase.from("transactions").delete().eq("id", id);
  };

  // ─── Birthday CRUD ─────────────────────────────────────────

  const addBirthday = async () => {
    if (!bdayName.trim() || !bdayDate || !user || !supabase) return;
    const bday: Birthday & { user_id: string } = {
      id: uuidv4(),
      name: bdayName.trim(),
      dob: bdayDate,
      note: bdayNote.trim(),
      created_at: new Date().toISOString(),
      user_id: user.id,
    };
    setBirthdays((prev) => [...prev, bday]);
    setBdayName("");
    setBdayDate("");
    setBdayNote("");
    setShowBirthdayForm(false);
    await supabase.from("birthdays").insert(bday);
  };

  const deleteBirthday = async (id: string) => {
    setBirthdays((prev) => prev.filter((b) => b.id !== id));
    if (supabase) await supabase.from("birthdays").delete().eq("id", id);
  };

  const getDaysUntilBirthday = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let nextBday = setYear(birthDate, today.getFullYear());
    if (isPast(nextBday) && !isToday(nextBday)) {
      nextBday = setYear(birthDate, today.getFullYear() + 1);
    }
    return differenceInDays(nextBday, today);
  };

  const getAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const sortedBirthdays = [...birthdays].sort((a, b) => getDaysUntilBirthday(a.dob) - getDaysUntilBirthday(b.dob));

  // ─── Notes CRUD ────────────────────────────────────────────

  const addNote = async () => {
    if (!user || !supabase) return;
    const note: Note & { user_id: string } = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "",
      pinned: false,
      public: false,
      author_name: user.email?.split("@")[0] || "Anonymous",
      tag: "none" as NoteTag,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: user.id,
    };
    setNotes((prev) => [note, ...prev]);
    setActiveNoteId(note.id);
    await supabase.from("notes").insert(note);
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    const updated_at = new Date().toISOString();
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates, updated_at } : n)));
    if (supabase) await supabase.from("notes").update({ ...updates, updated_at }).eq("id", id);
  };

  const deleteNote = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
    if (supabase) await supabase.from("notes").delete().eq("id", id);
  };

  const togglePinNote = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    updateNote(id, { pinned: !note.pinned });
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);
  const filteredNotes = notes.filter((n) => {
    const matchesSearch = noteSearch
      ? n.title.toLowerCase().includes(noteSearch.toLowerCase()) || n.content.toLowerCase().includes(noteSearch.toLowerCase())
      : true;
    const matchesTag = noteTagFilter === "all" || (n.tag || "none") === noteTagFilter;
    return matchesSearch && matchesTag;
  });
  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.pinned);

  // ─── Filtering ──────────────────────────────────────────────

  const getFilteredTodos = () => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    if (sidebarView === "daily") {
      return todos.filter((t) => t.category === "daily" && t.date === dateStr);
    }
    if (sidebarView === "weekly") {
      const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return todos.filter((t) => {
        const d = new Date(t.date);
        return t.category === "weekly" && d >= start && d <= end;
      });
    }
    if (sidebarView === "monthly") {
      const start = startOfMonth(selectedDate);
      const end = endOfMonth(selectedDate);
      return todos.filter((t) => {
        const d = new Date(t.date);
        return t.category === "monthly" && d >= start && d <= end;
      });
    }
    return [];
  };

  const getFilteredTransactions = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    return transactions.filter((t) => {
      const d = new Date(t.date);
      return d >= start && d <= end;
    });
  };

  const totalIncome = getFilteredTransactions()
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = getFilteredTransactions()
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // ─── Calendar ───────────────────────────────────────────────

  const renderCalendar = () => {
    const monthStart = startOfMonth(calendarDate);
    const monthEnd = endOfMonth(calendarDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const todosOnDay = (day: Date) => {
      const dateStr = format(day, "yyyy-MM-dd");
      return todos.filter((t) => t.date === dateStr).length;
    };

    return (
      <div className="select-none">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCalendarDate(subMonths(calendarDate, 1))}
            style={{ padding: "4px", border: "none", background: "transparent", color: "var(--text)", cursor: "pointer", borderRadius: "4px" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(128,128,128,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)" }}>{format(calendarDate, "MMMM yyyy")}</span>
          <button
            onClick={() => setCalendarDate(addMonths(calendarDate, 1))}
            style={{ padding: "4px", border: "none", background: "transparent", color: "var(--text)", cursor: "pointer", borderRadius: "4px" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(128,128,128,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center" style={{ gap: "2px" }}>
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="text-[var(--text-alt)] font-bold" style={{ fontSize: "10px", lineHeight: "24px" }}>{d}</div>
          ))}
          {days.map((day) => {
            const count = todosOnDay(day);
            const selected = isSameDay(day, selectedDate);
            const today = isToday(day);
            const inMonth = isSameMonth(day, calendarDate);
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  fontSize: "11px",
                  lineHeight: 1,
                  padding: 0,
                  margin: 0,
                  border: "none",
                  background: selected ? "var(--text)" : "transparent",
                  color: selected ? "var(--bg)" : !inMonth ? "var(--text-alt)" : "var(--text)",
                  opacity: !inMonth && !selected ? 0.3 : 1,
                  fontWeight: selected || today ? 700 : 400,
                  textDecoration: today && !selected ? "underline" : "none",
                  textUnderlineOffset: "2px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!selected) e.currentTarget.style.background = "rgba(128,128,128,0.15)";
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.background = "transparent";
                }}
              >
                {format(day, "d")}
                {count > 0 && (
                  <span style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#22c55e",
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Week Navigation ────────────────────────────────────────

  const renderWeekNav = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setSelectedDate(subWeeks(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-bold">
          {format(weekStart, "MMM d")} – {format(weekEnd, "MMM d, yyyy")}
        </span>
        <button onClick={() => setSelectedDate(addWeeks(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  // ─── Auth Guard ─────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-sm text-[var(--text-alt)] font-mono">Loading workspace...</span>
        </div>
      </div>
    );
  }

  const filteredTodos = getFilteredTodos();
  const completedCount = filteredTodos.filter((t) => t.completed).length;
  const filteredTransactions = getFilteredTransactions();

  // ─── Sidebar Items ──────────────────────────────────────────

  const sidebarItems: { key: SidebarView; label: string; icon: typeof ListTodo }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "daily", label: "Daily", icon: ListTodo },
    { key: "weekly", label: "Weekly", icon: CalendarDays },
    { key: "monthly", label: "Monthly", icon: CalendarRange },
    { key: "finance", label: "Finance", icon: Wallet },
    { key: "birthdays", label: "Birthdays", icon: Cake },
    { key: "notes", label: "Notes", icon: StickyNote },
  ];

  return (
    <div className="min-h-screen font-mono flex" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* ─── Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─────────────────────────────── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen border-r border-[var(--text)] border-opacity-10 flex flex-col z-50 transition-all lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "var(--bg)", width: sidebarCollapsed ? "60px" : "256px" }}
      >
        {/* Header */}
        <div className={`border-b border-[var(--text)] border-opacity-10 ${sidebarCollapsed ? "p-2" : "p-4"}`}>
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <Link to="/" className="text-xs text-[var(--text-alt)] hover:text-[var(--text)] no-underline flex items-center gap-1">
                <ArrowLeft size={12} /> home
              </Link>
            )}
            <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden p-1 text-[var(--text-alt)]">
              <X size={16} />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors border-0 bg-transparent"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>
          {!sidebarCollapsed && (
            <>
              <h2 className="text-lg font-bold mt-2 mb-0">Workspace</h2>
              <p className="text-xs text-[var(--text-alt)] truncate mt-0.5">{user.email}</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${sidebarCollapsed ? "p-1.5" : "p-3"} space-y-1`}>
          {sidebarItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setSidebarView(key); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"} text-sm text-left transition-all border-0 ${
                sidebarView === key
                  ? "bg-[var(--text)] text-[var(--bg)] font-bold"
                  : "text-[var(--text)] hover:bg-[var(--text)] hover:bg-opacity-5"
              }`}
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon size={16} />
              {!sidebarCollapsed && label}
            </button>
          ))}
        </nav>

        {/* Mini Calendar in sidebar */}


        {/* Sign Out */}
        <div className={`border-t border-[var(--text)] border-opacity-10 ${sidebarCollapsed ? "p-1.5" : "p-3"}`}>
          <button
            onClick={signOut}
            className={`w-full flex items-center ${sidebarCollapsed ? "justify-center px-0" : "gap-2 px-3"} py-2 text-sm text-red-500 hover:bg-red-500 hover:bg-opacity-10 transition-colors border-0 bg-transparent`}
            title={sidebarCollapsed ? "Sign Out" : undefined}
          >
            <LogOut size={14} />
            {!sidebarCollapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────── */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-[var(--text)] border-opacity-10 px-4 sm:px-6 py-3 flex items-center justify-between" style={{ background: "var(--bg)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-1 text-[var(--text)]">
              <ListTodo size={20} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold m-0">
              {sidebarView === "dashboard" ? "Dashboard" : sidebarView === "finance" ? "Finance Tracker" : sidebarView === "birthdays" ? "Birthdays" : sidebarView === "notes" ? "Notes" : `${sidebarView.charAt(0).toUpperCase() + sidebarView.slice(1)} Tasks`}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-alt)]">
              {format(selectedDate, "EEEE, MMM d yyyy")}
            </span>
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-1.5 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <div className={sidebarView === "notes" || sidebarView === "dashboard" ? "" : "max-w-4xl mx-auto px-4 sm:px-6 py-6"}>

          {/* ──────────────── DASHBOARD VIEW ──────────────── */}
          {sidebarView === "dashboard" && (() => {
            const userName = user.email?.split("@")[0] || "there";
            const greeting = currentTime.getHours() < 12 ? "Good morning" : currentTime.getHours() < 17 ? "Good afternoon" : "Good evening";

            // Dashboard calendar
            const dashMonthStart = startOfMonth(calendarDate);
            const dashMonthEnd = endOfMonth(calendarDate);
            const dashStartDate = startOfWeek(dashMonthStart, { weekStartsOn: 1 });
            const dashEndDate = endOfWeek(dashMonthEnd, { weekStartsOn: 1 });
            const dashDays = eachDayOfInterval({ start: dashStartDate, end: dashEndDate });

            // Aggregate data per day
            const holidays2026: Record<string, string[]> = {
              "2026-01-01": ["New Year's Day"],
              "2026-01-13": ["Lohri"],
              "2026-01-14": ["Makar Sankranti / Pongal"],
              "2026-01-23": ["Vasant Panchami"],
              "2026-01-26": ["Republic Day"],
              "2026-02-01": ["Guru Ravidas Jayanti"],
              "2026-02-15": ["Maha Shivaratri"],
              "2026-02-17": ["Ramadan Starts"],
              "2026-03-03": ["Holika Dahan"],
              "2026-03-04": ["Holi"],
              "2026-03-21": ["Gangaur"],
              "2026-03-27": ["Ram Navami"],
              "2026-04-02": ["Mahavir Jayanti"],
              "2026-04-03": ["Good Friday"],
              "2026-04-14": ["Vaisakhi / Baisakhi"],
              "2026-04-20": ["Eid al-Fitr"],
              "2026-05-01": ["Buddha Purnima"],
              "2026-06-20": ["Rath Yatra"],
              "2026-07-27": ["Eid al-Adha"],
              "2026-08-03": ["Raksha Bandhan"],
              "2026-08-15": ["Independence Day", "Janmashtami"],
              "2026-08-23": ["Ganesh Chaturthi"],
              "2026-09-01": ["Onam"],
              "2026-09-24": ["Eid-e-Milad"],
              "2026-10-02": ["Gandhi Jayanti"],
              "2026-10-11": ["Navratri Starts"],
              "2026-10-19": ["Durga Puja"],
              "2026-10-20": ["Dussehra"],
              "2026-10-29": ["Karva Chauth"],
              "2026-11-08": ["Diwali"],
              "2026-11-09": ["Govardhan Puja"],
              "2026-11-10": ["Bhai Dooj"],
              "2026-11-14": ["Chhath Puja"],
              "2026-12-25": ["Christmas"],
            };

            const getDayData = (day: Date) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const dayTodos = todos.filter((t) => t.date === dateStr);
              const dayBirthdays = birthdays.filter((b) => {
                const dob = parseISO(b.dob);
                return getMonth(dob) === getMonth(day) && getDate(dob) === getDate(day);
              });
              const dayHolidays = holidays2026[dateStr] || [];
              return { todos: dayTodos, birthdays: dayBirthdays, holidays: dayHolidays };
            };

            // Today's summary
            const todayStr = format(new Date(), "yyyy-MM-dd");
            const todayTodos = todos.filter((t) => t.date === todayStr);
            const todayPending = todayTodos.filter((t) => !t.completed).length;
            const todayCompleted = todayTodos.filter((t) => t.completed).length;
            const upcomingBirthdays = birthdays
              .map((b) => {
                const dob = parseISO(b.dob);
                let next = setYear(dob, new Date().getFullYear());
                if (isPast(next) && !isToday(next)) next = setYear(dob, new Date().getFullYear() + 1);
                return { ...b, nextBirthday: next, daysUntil: differenceInDays(next, new Date()) };
              })
              .filter((b) => b.daysUntil >= 0 && b.daysUntil <= 30)
              .sort((a, b) => a.daysUntil - b.daysUntil);

            return (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {/* Greeting */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold m-0">
                    {greeting}, <span style={{ color: "#a855f7" }}>{userName}</span>
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <Clock size={14} className="text-[var(--text-alt)]" />
                    <span className="text-sm text-[var(--text-alt)] font-mono">
                      {format(currentTime, "EEEE, MMMM d yyyy")} &middot; {format(currentTime, "hh:mm:ss a")}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: "Today's Tasks", value: todayTodos.length, sub: `${todayPending} pending`, color: "#3b82f6" },
                    { label: "Completed", value: todayCompleted, sub: "today", color: "#22c55e" },
                    { label: "Total Todos", value: todos.filter((t) => !t.completed).length, sub: "pending", color: "#f97316" },
                    { label: "Birthdays Soon", value: upcomingBirthdays.length, sub: "next 30 days", color: "#ec4899" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-[var(--text)] border-opacity-10 p-4"
                      style={{ borderLeft: `3px solid ${stat.color}` }}
                    >
                      <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs font-bold mt-1">{stat.label}</div>
                      <div className="text-[10px] text-[var(--text-alt)]">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Calendar */}
                <div className="border border-[var(--text)] border-opacity-10">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--text)] border-opacity-10">
                    <button
                      onClick={() => setCalendarDate(subMonths(calendarDate, 1))}
                      className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors border-0 bg-transparent text-[var(--text)]"
                      style={{ cursor: "pointer" }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-bold">{format(calendarDate, "MMMM yyyy")}</span>
                    <button
                      onClick={() => setCalendarDate(addMonths(calendarDate, 1))}
                      className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors border-0 bg-transparent text-[var(--text)]"
                      style={{ cursor: "pointer" }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 border-b border-[var(--text)] border-opacity-10">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <div key={d} className="text-center py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-alt)]">{d}</div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7">
                    {dashDays.map((day) => {
                      const data = getDayData(day);
                      const inMonth = isSameMonth(day, calendarDate);
                      const today = isToday(day);
                      const selected = isSameDay(day, selectedDate);
                      const hasTodos = data.todos.length > 0;
                      const hasBirthday = data.birthdays.length > 0;
                      const hasHoliday = data.holidays.length > 0;
                      const completedAll = hasTodos && data.todos.every((t) => t.completed);
                      const hasPending = data.todos.some((t) => !t.completed);

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => { setSelectedDate(day); setSidebarView("daily"); }}
                          style={{
                            minHeight: "80px",
                            padding: "6px",
                            border: "none",
                            borderRight: "1px solid rgba(128,128,128,0.08)",
                            borderBottom: "1px solid rgba(128,128,128,0.08)",
                            background: selected ? "rgba(168,85,247,0.08)" : today ? "rgba(128,128,128,0.04)" : "transparent",
                            opacity: inMonth ? 1 : 0.3,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            color: "var(--text)",
                            textAlign: "left",
                            verticalAlign: "top",
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "rgba(128,128,128,0.06)"; }}
                          onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = today ? "rgba(128,128,128,0.04)" : "transparent"; }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: today || selected ? 700 : 400,
                              color: today ? "#a855f7" : "var(--text)",
                              width: "22px",
                              height: "22px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              background: today ? "rgba(168,85,247,0.15)" : "transparent",
                            }}
                          >
                            {format(day, "d")}
                          </span>

                          {/* Todo indicators */}
                          {hasTodos && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                              {data.todos.slice(0, 3).map((todo) => (
                                <div
                                  key={todo.id}
                                  style={{
                                    fontSize: "9px",
                                    lineHeight: "14px",
                                    padding: "0 4px",
                                    borderRadius: "2px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    background: todo.completed ? "rgba(34,197,94,0.12)" : todo.category === "daily" ? "rgba(59,130,246,0.12)" : todo.category === "weekly" ? "rgba(249,115,22,0.12)" : "rgba(168,85,247,0.12)",
                                    color: todo.completed ? "#22c55e" : todo.category === "daily" ? "#3b82f6" : todo.category === "weekly" ? "#f97316" : "#a855f7",
                                    textDecoration: todo.completed ? "line-through" : "none",
                                  }}
                                >
                                  {todo.text}
                                </div>
                              ))}
                              {data.todos.length > 3 && (
                                <span style={{ fontSize: "9px", color: "var(--text-alt)" }}>+{data.todos.length - 3} more</span>
                              )}
                            </div>
                          )}

                          {/* Holiday indicator */}
                          {hasHoliday && data.holidays.map((h, i) => (
                            <div
                              key={`h-${i}`}
                              style={{
                                fontSize: "9px",
                                lineHeight: "14px",
                                padding: "0 4px",
                                borderRadius: "2px",
                                background: "rgba(234,179,8,0.12)",
                                color: "#eab308",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              ⭐ {h}
                            </div>
                          ))}

                          {/* Birthday indicator */}
                          {hasBirthday && data.birthdays.map((b) => (
                            <div
                              key={b.id}
                              style={{
                                fontSize: "9px",
                                lineHeight: "14px",
                                padding: "0 4px",
                                borderRadius: "2px",
                                background: "rgba(236,72,153,0.12)",
                                color: "#ec4899",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              🎂 {b.name}
                            </div>
                          ))}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--text)] border-opacity-10 flex-wrap">
                    {[
                      { color: "#3b82f6", label: "Daily" },
                      { color: "#f97316", label: "Weekly" },
                      { color: "#a855f7", label: "Monthly" },
                      { color: "#22c55e", label: "Done" },
                      { color: "#eab308", label: "Holiday" },
                      { color: "#ec4899", label: "Birthday" },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: l.color }} />
                        <span style={{ fontSize: "10px", color: "var(--text-alt)" }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Birthdays */}
                {upcomingBirthdays.length > 0 && (
                  <div className="mt-6 border border-[var(--text)] border-opacity-10">
                    <div className="px-4 py-2.5 border-b border-[var(--text)] border-opacity-10 flex items-center gap-2">
                      <Cake size={14} style={{ color: "#ec4899" }} />
                      <span className="text-xs font-bold">Upcoming Birthdays</span>
                    </div>
                    <div className="divide-y divide-[var(--text)] divide-opacity-5">
                      {upcomingBirthdays.slice(0, 5).map((b) => (
                        <div key={b.id} className="px-4 py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gift size={13} style={{ color: "#ec4899" }} />
                            <span className="text-sm font-bold">{b.name}</span>
                          </div>
                          <span className="text-xs text-[var(--text-alt)]">
                            {b.daysUntil === 0 ? "🎉 Today!" : `in ${b.daysUntil} day${b.daysUntil === 1 ? "" : "s"}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── Week navigation for weekly view */}
          {sidebarView === "weekly" && renderWeekNav()}

          {/* ── Month navigation for monthly view */}
          {sidebarView === "monthly" && (
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedDate(subMonths(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold">{format(selectedDate, "MMMM yyyy")}</span>
              <button onClick={() => setSelectedDate(addMonths(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* ──────────────── TASK VIEWS ──────────────── */}
          {(sidebarView === "daily" || sidebarView === "weekly" || sidebarView === "monthly") && (
            <>
              {/* Add Task */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  placeholder={`Add a ${sidebarView} task...`}
                  className="flex-1 h-11 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] focus:border-opacity-100 outline-none transition-all text-sm font-mono"
                />
                <button
                  onClick={addTodo}
                  disabled={!newTodo.trim()}
                  className="h-11 px-4 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-bold text-sm hover:opacity-90 disabled:opacity-30 transition-opacity flex items-center gap-1"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              {/* Progress */}
              {filteredTodos.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-alt)] mb-1.5">
                    <span>{completedCount} of {filteredTodos.length} completed</span>
                    <span>{filteredTodos.length > 0 ? Math.round((completedCount / filteredTodos.length) * 100) : 0}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--text)] bg-opacity-10 overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${filteredTodos.length > 0 ? (completedCount / filteredTodos.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Task List */}
              <div className="space-y-1">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-16 text-[var(--text-alt)]">
                    <ListTodo size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No {sidebarView} tasks for this period</p>
                    <p className="text-xs mt-1 opacity-60">Add one above to get started</p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <div key={todo.id}>
                      {/* Mobile card style */}
                      <div className="sm:hidden flex items-center rounded-xl bg-[var(--bg)] border border-[var(--text)] border-opacity-10 shadow-sm px-3 py-3 mb-2 gap-3 group transition-all">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`w-6 h-6 border flex-shrink-0 flex items-center justify-center rounded-full transition-all ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-[var(--text)] border-opacity-30 bg-transparent hover:border-opacity-60"
                          }`}
                        >
                          {todo.completed && <Check size={14} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-[15px] truncate ${todo.completed ? "line-through" : ""}`}>{todo.text}</div>
                          <div className="text-xs text-[var(--text-alt)] truncate mt-0.5">
                            {/* Show a short desc if available, else first 40 chars */}
                            {todo.desc ? todo.desc.slice(0, 60) : todo.text.slice(0, 40)}
                          </div>
                        </div>
                        <button
                          onClick={() => { setEditingId(todo.id); setEditText(todo.text); }}
                          className="text-[var(--text-alt)] hover:text-[var(--text)] transition-all p-1"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-400 transition-all p-1"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      {/* Desktop style (unchanged) */}
                      <div className="hidden sm:flex items-center gap-3 px-3 py-2.5 border border-[var(--text)] border-opacity-10 hover:border-opacity-20 transition-all group rounded-lg ${todo.completed ? 'opacity-50' : ''}">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-all ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-[var(--text)] border-opacity-30 bg-transparent hover:border-opacity-60"
                          }`}
                        >
                          {todo.completed && <Check size={12} />}
                        </button>
                        {editingId === todo.id ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                              className="flex-1 h-7 px-2 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] text-sm font-mono outline-none"
                              autoFocus
                            />
                            <button onClick={() => saveEdit(todo.id)} className="text-green-500 hover:text-green-400 p-0.5">
                              <Save size={14} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-[var(--text-alt)] hover:text-[var(--text)] p-0.5">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className={`flex-1 text-sm ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
                            <span className="text-xs text-[var(--text-alt)] opacity-0 group-hover:opacity-100 transition-opacity">
                              {format(new Date(todo.date), "MMM d")}
                            </span>
                            <button
                              onClick={() => { setEditingId(todo.id); setEditText(todo.text); }}
                              className="opacity-0 group-hover:opacity-100 text-[var(--text-alt)] hover:text-[var(--text)] transition-all p-0.5"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all p-0.5"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ──────────────── FINANCE VIEW ──────────────── */}
          {sidebarView === "finance" && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="border border-[var(--text)] border-opacity-10 p-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-alt)] mb-1">
                    <TrendingUp size={14} className="text-green-500" /> Income
                  </div>
                  <div className="text-xl font-bold text-green-500">₹{totalIncome.toLocaleString()}</div>
                </div>
                <div className="border border-[var(--text)] border-opacity-10 p-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-alt)] mb-1">
                    <TrendingDown size={14} className="text-red-500" /> Expenses
                  </div>
                  <div className="text-xl font-bold text-red-500">₹{totalExpense.toLocaleString()}</div>
                </div>
                <div className="border border-[var(--text)] border-opacity-10 p-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-alt)] mb-1">
                    <DollarSign size={14} /> Balance
                  </div>
                  <div className={`text-xl font-bold ${totalIncome - totalExpense >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹{(totalIncome - totalExpense).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setSelectedDate(subMonths(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold">{format(selectedDate, "MMMM yyyy")}</span>
                <button onClick={() => setSelectedDate(addMonths(selectedDate, 1))} className="p-1 hover:bg-[var(--text)] hover:bg-opacity-10">
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Add Transaction */}
              {!showFinanceForm ? (
                <button
                  onClick={() => setShowFinanceForm(true)}
                  className="w-full h-11 border border-dashed border-[var(--text)] border-opacity-20 hover:border-opacity-40 bg-transparent text-[var(--text-alt)] hover:text-[var(--text)] text-sm flex items-center justify-center gap-2 transition-all mb-4"
                >
                  <Plus size={16} /> Add Transaction
                </button>
              ) : (
                <div className="border border-[var(--text)] border-opacity-20 p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">New Transaction</span>
                    <button onClick={() => setShowFinanceForm(false)} className="text-[var(--text-alt)] hover:text-[var(--text)]">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Type toggle */}
                  <div className="flex gap-0">
                    <button
                      onClick={() => { setFinanceType("expense"); setFinanceCategory("Other"); }}
                      className={`flex-1 h-9 text-xs font-bold border transition-all ${
                        financeType === "expense"
                          ? "bg-red-500 border-red-500 text-white"
                          : "border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text-alt)]"
                      }`}
                    >
                      Expense
                    </button>
                    <button
                      onClick={() => { setFinanceType("income"); setFinanceCategory("Other"); }}
                      className={`flex-1 h-9 text-xs font-bold border border-l-0 transition-all ${
                        financeType === "income"
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text-alt)]"
                      }`}
                    >
                      Income
                    </button>
                  </div>

                  <input
                    type="text"
                    value={financeDesc}
                    onChange={(e) => setFinanceDesc(e.target.value)}
                    placeholder="Description"
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  />

                  <input
                    type="number"
                    value={financeAmount}
                    onChange={(e) => setFinanceAmount(e.target.value)}
                    placeholder="Amount (₹)"
                    min="0"
                    step="0.01"
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  />

                  <select
                    value={financeCategory}
                    onChange={(e) => setFinanceCategory(e.target.value)}
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-[var(--bg)] text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  >
                    {(financeType === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <button
                    onClick={addTransaction}
                    disabled={!financeDesc.trim() || !financeAmount}
                    className="w-full h-9 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-bold text-sm hover:opacity-90 disabled:opacity-30 transition-opacity"
                  >
                    Add {financeType === "income" ? "Income" : "Expense"}
                  </button>
                </div>
              )}

              {/* Transaction List */}
              <div className="space-y-1">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-16 text-[var(--text-alt)]">
                    <Wallet size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No transactions this month</p>
                    <p className="text-xs mt-1 opacity-60">Add one to start tracking</p>
                  </div>
                ) : (
                  filteredTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center gap-3 px-3 py-2.5 border border-[var(--text)] border-opacity-10 hover:border-opacity-20 transition-all group"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tx.type === "income" ? "bg-green-500" : "bg-red-500"}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm block truncate">{tx.description}</span>
                        <span className="text-xs text-[var(--text-alt)]">
                          {tx.category} · {format(new Date(tx.date), "MMM d")}
                        </span>
                      </div>
                      <span className={`text-sm font-bold flex-shrink-0 ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}>
                        {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all p-0.5 flex-shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ──────────────── BIRTHDAYS VIEW ──────────────── */}
          {sidebarView === "birthdays" && (
            <>
              {/* Upcoming banner */}
              {sortedBirthdays.length > 0 && getDaysUntilBirthday(sortedBirthdays[0].dob) <= 7 && (
                <div className="mb-6 border border-yellow-500 border-opacity-30 bg-yellow-500 bg-opacity-5 p-4 flex items-center gap-3">
                  <Gift size={20} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-bold">{sortedBirthdays[0].name}'s birthday</span>
                    <span className="text-xs text-[var(--text-alt)] ml-2">
                      {getDaysUntilBirthday(sortedBirthdays[0].dob) === 0
                        ? "is TODAY! 🎉"
                        : `in ${getDaysUntilBirthday(sortedBirthdays[0].dob)} day${getDaysUntilBirthday(sortedBirthdays[0].dob) !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Add Birthday */}
              {!showBirthdayForm ? (
                <button
                  onClick={() => setShowBirthdayForm(true)}
                  className="w-full h-11 border border-dashed border-[var(--text)] border-opacity-20 hover:border-opacity-40 bg-transparent text-[var(--text-alt)] hover:text-[var(--text)] text-sm flex items-center justify-center gap-2 transition-all mb-6"
                >
                  <Plus size={16} /> Add Birthday
                </button>
              ) : (
                <div className="border border-[var(--text)] border-opacity-20 p-4 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">New Birthday</span>
                    <button onClick={() => setShowBirthdayForm(false)} className="text-[var(--text-alt)] hover:text-[var(--text)]">
                      <X size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={bdayName}
                    onChange={(e) => setBdayName(e.target.value)}
                    placeholder="Person's name"
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  />
                  <input
                    type="date"
                    value={bdayDate}
                    onChange={(e) => setBdayDate(e.target.value)}
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-[var(--bg)] text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  />
                  <input
                    type="text"
                    value={bdayNote}
                    onChange={(e) => setBdayNote(e.target.value)}
                    placeholder="Gift idea or note (optional)"
                    className="w-full h-9 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] text-sm font-mono outline-none focus:border-opacity-100"
                  />
                  <button
                    onClick={addBirthday}
                    disabled={!bdayName.trim() || !bdayDate}
                    className="w-full h-9 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-bold text-sm hover:opacity-90 disabled:opacity-30 transition-opacity"
                  >
                    Save Birthday
                  </button>
                </div>
              )}

              {/* Birthday List */}
              <div className="space-y-1">
                {sortedBirthdays.length === 0 ? (
                  <div className="text-center py-16 text-[var(--text-alt)]">
                    <Cake size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No birthdays saved</p>
                    <p className="text-xs mt-1 opacity-60">Add someone's DOB to never miss a wish</p>
                  </div>
                ) : (
                  sortedBirthdays.map((bday) => {
                    const daysUntil = getDaysUntilBirthday(bday.dob);
                    const age = getAge(bday.dob);
                    const isBirthdayToday = daysUntil === 0;
                    return (
                      <div
                        key={bday.id}
                        className={`flex items-center gap-3 px-3 py-3 border border-[var(--text)] border-opacity-10 hover:border-opacity-20 transition-all group ${
                          isBirthdayToday ? "border-yellow-500 border-opacity-40 bg-yellow-500 bg-opacity-5" : ""
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm ${
                          isBirthdayToday ? "bg-yellow-500 text-white" : daysUntil <= 7 ? "bg-orange-500 bg-opacity-20 text-orange-500" : "bg-[var(--text)] bg-opacity-5 text-[var(--text-alt)]"
                        }`}>
                          {isBirthdayToday ? "🎂" : <Cake size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold block truncate">{bday.name}</span>
                          <span className="text-xs text-[var(--text-alt)]">
                            {format(new Date(bday.dob), "MMM d, yyyy")} · Age {age}
                            {bday.note && ` · ${bday.note}`}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-xs font-bold ${
                            isBirthdayToday ? "text-yellow-500" : daysUntil <= 7 ? "text-orange-500" : "text-[var(--text-alt)]"
                          }`}>
                            {isBirthdayToday ? "Today!" : `${daysUntil}d`}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteBirthday(bday.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all p-0.5 flex-shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* ──────────────── NOTES VIEW ──────────────── */}
          {sidebarView === "notes" && (
            <div className="flex flex-col" style={{ height: "calc(100vh - 57px)" }}>
              {activeNote ? (() => {
                  const activeTagInfo = getTagInfo(activeNote.tag || "none");
                  return (
                    <div className="flex flex-col flex-1 overflow-hidden">
                      {/* Editor toolbar */}
                      <div
                        className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-[var(--text)] border-opacity-10"
                        style={{
                          background: activeTagInfo.key !== "none" ? activeTagInfo.bg : "transparent",
                          borderBottomColor: activeTagInfo.key !== "none" ? activeTagInfo.border : undefined,
                        }}
                      >
                        <div className="flex items-center gap-1">
                          {/* Back button — mobile only */}
                          <button
                            onClick={() => setActiveNoteId(null)}
                            className="p-1.5 md:hidden text-[var(--text-alt)] hover:text-[var(--text)] transition-colors"
                            title="Back to notes"
                          >
                            <ArrowLeft size={16} />
                          </button>
                          {/* Pin */}
                          <button
                            onClick={() => togglePinNote(activeNote.id)}
                            className={`p-1.5 transition-colors ${
                              activeNote.pinned ? "text-yellow-500" : "text-[var(--text-alt)] hover:text-[var(--text)]"
                            }`}
                            title={activeNote.pinned ? "Unpin" : "Pin"}
                          >
                            {activeNote.pinned ? <Pin size={14} /> : <PinOff size={14} />}
                          </button>

                          {/* Divider */}
                          <div style={{ width: "1px", height: "16px", background: "rgba(128,128,128,0.2)", margin: "0 4px" }} />

                          {/* Tag picker */}
                          <div className="relative">
                            <button
                              onClick={() => setShowTagPicker(!showTagPicker)}
                              className="p-1.5 transition-colors flex items-center gap-1.5"
                              style={{ color: activeTagInfo.key !== "none" ? activeTagInfo.color : "var(--text-alt)" }}
                              title="Change tag color"
                            >
                              <Tag size={14} />
                              {activeTagInfo.key !== "none" && (
                                <span style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: activeTagInfo.color,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                }}>
                                  {activeTagInfo.label}
                                </span>
                              )}
                            </button>
                            {showTagPicker && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowTagPicker(false)} />
                                <div
                                  className="absolute top-full left-0 mt-1 z-50 p-2 shadow-lg"
                                  style={{
                                    background: "var(--bg)",
                                    border: "1px solid rgba(128,128,128,0.2)",
                                    minWidth: "140px",
                                  }}
                                >
                                  {NOTE_TAGS.map((t) => (
                                    <button
                                      key={t.key}
                                      onClick={() => {
                                        updateNote(activeNote.id, { tag: t.key });
                                        setShowTagPicker(false);
                                      }}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "6px 8px",
                                        border: "none",
                                        background: (activeNote.tag || "none") === t.key ? "rgba(128,128,128,0.1)" : "transparent",
                                        color: "var(--text)",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        fontWeight: (activeNote.tag || "none") === t.key ? 700 : 400,
                                        borderRadius: "2px",
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(128,128,128,0.08)"}
                                      onMouseLeave={(e) => e.currentTarget.style.background = (activeNote.tag || "none") === t.key ? "rgba(128,128,128,0.1)" : "transparent"}
                                    >
                                      <span style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        background: t.key === "none" ? "transparent" : t.color,
                                        border: t.key === "none" ? "2px solid rgba(128,128,128,0.3)" : "none",
                                        flexShrink: 0,
                                      }} />
                                      {t.label}
                                      {(activeNote.tag || "none") === t.key && <Check size={12} style={{ marginLeft: "auto" }} />}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-[var(--text-alt)] mr-2 hidden sm:inline">
                            {format(new Date(activeNote.updated_at), "MMM d, yyyy h:mm a")}
                          </span>
                          {/* AI Rewrite button */}
                          <button
                            onClick={() => rewriteWithAI(activeNote.id)}
                            disabled={aiRewriting || !activeNote.content.trim()}
                            className="p-1.5 transition-colors flex items-center gap-1"
                            style={{
                              color: aiRewriting ? "#a855f7" : "var(--text-alt)",
                              opacity: (!activeNote.content.trim() && !aiRewriting) ? 0.3 : 1,
                            }}
                            title="Rewrite with AI"
                          >
                            {aiRewriting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                          </button>
                          {/* Share / Make Public button */}
                          <button
                            onClick={async () => {
                              const newPublic = !activeNote.public;
                              await updateNote(activeNote.id, { public: newPublic } as Partial<Note>);
                              if (newPublic) {
                                const url = `${window.location.origin}/notes/${user.id}/${activeNote.id}`;
                                navigator.clipboard.writeText(url);
                                setShareLinkCopied(true);
                                setTimeout(() => setShareLinkCopied(false), 2500);
                              }
                            }}
                            className="p-1.5 transition-colors flex items-center gap-1"
                            style={{ color: activeNote.public ? "#22c55e" : "var(--text-alt)" }}
                            title={activeNote.public ? "Public — click to make private" : "Private — click to share publicly"}
                          >
                            {activeNote.public ? <Globe size={14} /> : <Share2 size={14} />}
                          </button>
                          {/* Copy share link (only when public) */}
                          {activeNote.public && (
                            <button
                              onClick={() => {
                                const url = `${window.location.origin}/notes/${user.id}/${activeNote.id}`;
                                navigator.clipboard.writeText(url);
                                setShareLinkCopied(true);
                                setTimeout(() => setShareLinkCopied(false), 2500);
                              }}
                              className="p-1.5 transition-colors"
                              style={{ color: shareLinkCopied ? "#22c55e" : "var(--text-alt)" }}
                              title="Copy share link"
                            >
                              {shareLinkCopied ? <CheckCheck size={14} /> : <LinkIcon size={14} />}
                            </button>
                          )}
                          <button
                            onClick={() => deleteNote(activeNote.id)}
                            className="p-1.5 text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Tag color bar */}
                      {activeTagInfo.key !== "none" && (
                        <div style={{ height: "2px", background: activeTagInfo.color, opacity: 0.6 }} />
                      )}

                      {/* Formatting toolbar */}
                      <div
                        className="flex items-center gap-0.5 px-3 sm:px-5 py-2 border-b border-[var(--text)] border-opacity-5 overflow-x-auto"
                        style={{ flexShrink: 0 }}
                      >
                        <button onClick={() => execFormat("bold")} className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors" style={{ color: "var(--text-alt)", border: "none", background: "transparent" }} title="Bold (Ctrl+B)"><Bold size={14} /></button>
                        <button onClick={() => execFormat("italic")} className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors" style={{ color: "var(--text-alt)", border: "none", background: "transparent" }} title="Italic (Ctrl+I)"><Italic size={14} /></button>
                        <button onClick={() => execFormat("underline")} className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors" style={{ color: "var(--text-alt)", border: "none", background: "transparent" }} title="Underline (Ctrl+U)"><Underline size={14} /></button>
                        <div style={{ width: "1px", height: "16px", background: "var(--text)", opacity: 0.1, margin: "0 4px" }} />
                        <button onClick={insertLink} className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors" style={{ color: "var(--text-alt)", border: "none", background: "transparent" }} title="Insert Link"><Link2 size={14} /></button>
                        <div style={{ width: "1px", height: "16px", background: "var(--text)", opacity: 0.1, margin: "0 4px" }} />
                        {/* Font picker */}
                        <div className="relative">
                          <button
                            onClick={() => setShowFontPicker(!showFontPicker)}
                            className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors flex items-center gap-1"
                            style={{ color: "var(--text-alt)", border: "none", background: "transparent", fontSize: "11px" }}
                            title="Change Font"
                          >
                            <Type size={14} />
                            <span className="hidden sm:inline">Font</span>
                          </button>
                          {showFontPicker && (
                            <div
                              className="absolute left-0 top-full mt-1 z-50 border border-[var(--text)] border-opacity-10 py-1 shadow-lg"
                              style={{ background: "var(--bg)", minWidth: "160px" }}
                            >
                              {FONTS.map((f) => (
                                <button
                                  key={f.label}
                                  onClick={() => {
                                    execFormat("fontName", f.value);
                                    setShowFontPicker(false);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors"
                                  style={{ border: "none", background: "transparent", color: "var(--text)", fontSize: "12px", fontFamily: f.value, cursor: "pointer" }}
                                >
                                  {f.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div style={{ width: "1px", height: "16px", background: "var(--text)", opacity: 0.1, margin: "0 4px" }} />
                        <button onClick={() => execFormat("strikeThrough")} className="p-1.5 hover:bg-[var(--text)] hover:bg-opacity-10 transition-colors" style={{ color: "var(--text-alt)", border: "none", background: "transparent", textDecoration: "line-through", fontSize: "13px", fontWeight: 700 }} title="Strikethrough">S</button>
                      </div>

                      {/* Title */}
                      <input
                        type="text"
                        value={activeNote.title}
                        onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                        className="px-3 sm:px-5 pt-4 sm:pt-5 pb-2 text-xl sm:text-2xl font-bold bg-transparent text-[var(--text)] outline-none border-none w-full"
                        placeholder="Title"
                        style={{ fontFamily: "inherit" }}
                      />
                      {/* Content */}
                      <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={() => {
                          if (editorRef.current && activeNote) {
                            updateNote(activeNote.id, { content: editorRef.current.innerHTML });
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const text = e.clipboardData.getData("text/html") || e.clipboardData.getData("text/plain");
                          document.execCommand("insertHTML", false, text);
                        }}
                        className={`px-3 sm:px-5 py-3 text-sm bg-transparent text-[var(--text)] outline-none border-none w-full overflow-y-auto ${aiRewriteResult ? '' : 'flex-1'}`}
                        style={{
                          fontFamily: "inherit", lineHeight: 1.8, letterSpacing: "0.01em",
                          minHeight: aiRewriteResult ? "120px" : "200px",
                          whiteSpace: "pre-wrap", wordBreak: "break-word",
                        }}
                        data-placeholder="Start writing..."
                      />

                      {/* AI Rewrite Result Panel */}
                      {aiRewriteResult && (
                        <div
                          className="mx-5 mb-4 border overflow-hidden"
                          style={{
                            borderColor: aiRewriteResult.startsWith("Error:") ? "rgba(239,68,68,0.3)" : "rgba(168,85,247,0.3)",
                            background: aiRewriteResult.startsWith("Error:") ? "rgba(239,68,68,0.05)" : "rgba(168,85,247,0.05)",
                          }}
                        >
                          <div
                            className="flex items-center justify-between px-3 py-2"
                            style={{
                              borderBottom: "1px solid",
                              borderColor: aiRewriteResult.startsWith("Error:") ? "rgba(239,68,68,0.15)" : "rgba(168,85,247,0.15)",
                            }}
                          >
                            <div className="flex items-center gap-1.5">
                              <Sparkles size={12} style={{ color: aiRewriteResult.startsWith("Error:") ? "#ef4444" : "#a855f7" }} />
                              <span style={{ fontSize: "11px", fontWeight: 700, color: aiRewriteResult.startsWith("Error:") ? "#ef4444" : "#a855f7" }}>
                                {aiRewriteResult.startsWith("Error:") ? "Error" : "AI Rewrite"}
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {!aiRewriteResult.startsWith("Error:") && (
                                <>
                                  <button
                                    onClick={copyAiResult}
                                    className="p-1 transition-colors"
                                    style={{ color: aiCopied ? "#22c55e" : "var(--text-alt)" }}
                                    title="Copy"
                                  >
                                    {aiCopied ? <CheckCheck size={13} /> : <Copy size={13} />}
                                  </button>
                                  <button
                                    onClick={() => applyAiRewrite(activeNote.id)}
                                    className="p-1 transition-colors"
                                    style={{ color: "#a855f7" }}
                                    title="Apply — replace note content"
                                  >
                                    <Check size={13} />
                                  </button>
                                  <button
                                    onClick={() => rewriteWithAI(activeNote.id)}
                                    className="p-1 transition-colors"
                                    style={{ color: "var(--text-alt)" }}
                                    title="Regenerate"
                                  >
                                    <RotateCcw size={13} />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => setAiRewriteResult(null)}
                                className="p-1 transition-colors"
                                style={{ color: "var(--text-alt)" }}
                                title="Dismiss"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          </div>
                          <div
                            className="px-3 py-3 text-sm overflow-y-auto"
                            style={{
                              maxHeight: "200px",
                              lineHeight: 1.8,
                              color: aiRewriteResult.startsWith("Error:") ? "#ef4444" : "var(--text)",
                              whiteSpace: "pre-wrap",
                              fontFamily: "inherit",
                            }}
                          >
                            {aiRewriteResult}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })() : (
                  /* ── Card Grid View ── */
                  <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Search bar + Add button */}
                    <div className="p-4 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 relative">
                          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-alt)] opacity-60" />
                          <input
                            type="text"
                            value={noteSearch}
                            onChange={(e) => setNoteSearch(e.target.value)}
                            placeholder="Search your notes"
                            className="w-full h-10 pl-10 pr-3 border border-[var(--text)] border-opacity-10 bg-[var(--text)] bg-opacity-5 text-[var(--text)] text-sm outline-none focus:border-opacity-30 rounded-xl"
                            style={{ fontFamily: "inherit" }}
                          />
                        </div>
                        <button
                          onClick={addNote}
                          className="h-10 w-10 flex items-center justify-center rounded-xl border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all flex-shrink-0"
                          title="New note"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {/* Tag filter chips */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => setNoteTagFilter("all")}
                          style={{
                            fontSize: "11px",
                            padding: "4px 12px",
                            border: "1px solid",
                            borderColor: noteTagFilter === "all" ? "var(--text)" : "rgba(128,128,128,0.2)",
                            background: noteTagFilter === "all" ? "var(--text)" : "transparent",
                            color: noteTagFilter === "all" ? "var(--bg)" : "var(--text-alt)",
                            fontWeight: noteTagFilter === "all" ? 700 : 400,
                            fontFamily: "inherit",
                            cursor: "pointer",
                            borderRadius: "999px",
                          }}
                        >
                          All
                        </button>
                        {NOTE_TAGS.filter(t => t.key !== "none").map((t) => (
                          <button
                            key={t.key}
                            onClick={() => setNoteTagFilter(noteTagFilter === t.key ? "all" : t.key)}
                            title={t.label}
                            style={{
                              width: "22px",
                              height: "22px",
                              border: "2px solid",
                              borderColor: noteTagFilter === t.key ? t.color : "rgba(128,128,128,0.15)",
                              background: noteTagFilter === t.key ? t.bg : "transparent",
                              cursor: "pointer",
                              borderRadius: "50%",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: t.color, display: "block" }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card grid */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                      {pinnedNotes.length > 0 && (
                        <div className="mb-2 mt-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-alt)] opacity-50">Pinned</span>
                        </div>
                      )}
                      {pinnedNotes.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                          {pinnedNotes.map((note) => {
                            const card = CARD_COLORS[note.tag || "none"];
                            return (
                              <button
                                key={note.id}
                                onClick={() => { setActiveNoteId(note.id); setAiRewriteResult(null); }}
                                className="text-left rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg"
                                style={{
                                  background: card.bg,
                                  color: card.text,
                                  border: (note.tag || "none") === "none" ? "1px solid rgba(128,128,128,0.15)" : "none",
                                  minHeight: "140px",
                                  display: "flex",
                                  flexDirection: "column",
                                  fontFamily: "inherit",
                                  cursor: "pointer",
                                }}
                              >
                                <div className="flex items-center gap-1 mb-2">
                                  <Pin size={11} style={{ color: card.text, opacity: 0.7, flexShrink: 0 }} />
                                  <span className="font-bold text-sm truncate">{note.title || "Untitled"}</span>
                                  {note.public && <Globe size={10} style={{ opacity: 0.7, flexShrink: 0 }} />}
                                </div>
                                <div
                                  className="text-xs flex-1 overflow-hidden"
                                  style={{ color: card.sub, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" }}
                                >
                                  {stripHtml(note.content).slice(0, 200) || "No content"}
                                </div>
                                <div className="mt-3 text-[10px]" style={{ color: card.sub, opacity: 0.7 }}>
                                  {format(new Date(note.updated_at), "MMM d, h:mm a")}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {unpinnedNotes.length > 0 && pinnedNotes.length > 0 && (
                        <div className="mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-alt)] opacity-50">Notes</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {unpinnedNotes.map((note) => {
                          const card = CARD_COLORS[note.tag || "none"];
                          return (
                            <button
                              key={note.id}
                              onClick={() => { setActiveNoteId(note.id); setAiRewriteResult(null); }}
                              className="text-left rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg"
                              style={{
                                background: card.bg,
                                color: card.text,
                                border: (note.tag || "none") === "none" ? "1px solid rgba(128,128,128,0.15)" : "none",
                                minHeight: "140px",
                                display: "flex",
                                flexDirection: "column",
                                fontFamily: "inherit",
                                cursor: "pointer",
                              }}
                            >
                              <span className="font-bold text-sm truncate mb-2 flex items-center gap-1">
                                {note.title || "Untitled"}
                                {note.public && <Globe size={10} style={{ opacity: 0.7, flexShrink: 0 }} />}
                              </span>
                              <div
                                className="text-xs flex-1 overflow-hidden"
                                style={{ color: card.sub, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" }}
                              >
                                {stripHtml(note.content).slice(0, 200) || "No content"}
                              </div>
                              <div className="mt-3 text-[10px]" style={{ color: card.sub, opacity: 0.7 }}>
                                {format(new Date(note.updated_at), "MMM d, h:mm a")}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {filteredNotes.length === 0 && (
                        <div className="text-center py-20 text-[var(--text-alt)]">
                          <StickyNote size={36} className="mx-auto mb-3 opacity-20" />
                          <p className="text-sm">{noteSearch || noteTagFilter !== "all" ? "No matching notes" : "No notes yet"}</p>
                          <p className="text-xs mt-1 opacity-50">Click + to create one</p>
                        </div>
                      )}
                    </div>

                    {/* Note count */}
                    <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(128,128,128,0.1)", fontSize: "11px", color: "var(--text-alt)", opacity: 0.6 }}>
                      {notes.length} note{notes.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
