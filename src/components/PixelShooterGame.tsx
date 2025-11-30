import React, { useEffect, useRef, useState } from 'react';

const PixelShooterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'gameover'>('start');

  // Game Constants
  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 240;
  const PLAYER_SPEED = 3;
  const BULLET_SPEED = 5;
  const ENEMY_SPEED = 0.5;
  const ENEMY_DROP = 10;

  // Assets
  const playerImg = useRef<HTMLImageElement | null>(null);
  const ufoImg = useRef<HTMLImageElement | null>(null);

  // Mutable Game State
  const state = useRef({
    player: { x: CANVAS_WIDTH / 2 - 12, y: CANVAS_HEIGHT - 30, w: 24, h: 24 },
    bullets: [] as { x: number; y: number; w: number; h: number; active: boolean }[],
    enemies: [] as { x: number; y: number; w: number; h: number; active: boolean }[],
    enemyDir: 1,
    stars: [] as { x: number; y: number; speed: number; brightness: number }[],
    keys: { left: false, right: false, space: false },
    lastShotTime: 0,
    frameCount: 0
  });

  // Load Assets
  useEffect(() => {
    const pImg = new Image();
    pImg.src = '/stickers/fighterplane.png';
    playerImg.current = pImg;

    const uImg = new Image();
    uImg.src = '/stickers/ufo.png';
    ufoImg.current = uImg;
  }, []);

  // Initialize Game
  const initGame = () => {
    state.current.player = { x: CANVAS_WIDTH / 2 - 12, y: CANVAS_HEIGHT - 30, w: 24, h: 24 };
    state.current.bullets = [];
    state.current.enemies = [];
    state.current.enemyDir = 1;
    state.current.keys = { left: false, right: false, space: false };
    
    // Create Enemies Grid
    const rows = 3;
    const cols = 6;
    const padding = 15;
    const enemyW = 24;
    const enemyH = 18;
    const startX = (CANVAS_WIDTH - (cols * (enemyW + padding))) / 2;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        state.current.enemies.push({
          x: startX + c * (enemyW + padding),
          y: 30 + r * (enemyH + padding),
          w: enemyW,
          h: enemyH,
          active: true
        });
      }
    }

    // Create Stars
    state.current.stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      speed: 0.2 + Math.random() * 0.5,
      brightness: Math.random()
    }));

    setScore(0);
    setLives(3);
    setGameStatus('playing');
  };

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;
      if (e.code === 'ArrowLeft') state.current.keys.left = true;
      if (e.code === 'ArrowRight') state.current.keys.right = true;
      if (e.code === 'Space') {
        state.current.keys.space = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') state.current.keys.left = false;
      if (e.code === 'ArrowRight') state.current.keys.right = false;
      if (e.code === 'Space') state.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStatus]);

  // Touch Controls Handlers
  const handleTouchStart = (action: 'left' | 'right' | 'fire') => {
    if (gameStatus !== 'playing') return;
    if (action === 'left') state.current.keys.left = true;
    if (action === 'right') state.current.keys.right = true;
    if (action === 'fire') state.current.keys.space = true;
  };

  const handleTouchEnd = (action: 'left' | 'right' | 'fire') => {
    if (action === 'left') state.current.keys.left = false;
    if (action === 'right') state.current.keys.right = false;
    if (action === 'fire') state.current.keys.space = false;
  };

  // Game Loop
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    let animationFrameId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const loop = (time: number) => {
      if (!ctx || !canvas) return;
      const s = state.current;

      // --- UPDATE ---

      // Move Player
      if (s.keys.left) s.player.x = Math.max(0, s.player.x - PLAYER_SPEED);
      if (s.keys.right) s.player.x = Math.min(CANVAS_WIDTH - s.player.w, s.player.x + PLAYER_SPEED);

      // Shoot
      if (s.keys.space && time - s.lastShotTime > 300) {
        s.bullets.push({
          x: s.player.x + s.player.w / 2 - 1,
          y: s.player.y,
          w: 2,
          h: 6,
          active: true
        });
        s.lastShotTime = time;
      }

      // Move Bullets
      s.bullets.forEach(b => {
        b.y -= BULLET_SPEED;
        if (b.y < 0) b.active = false;
      });

      // Move Enemies
      let hitEdge = false;
      const activeEnemies = s.enemies.filter(e => e.active);
      
      if (activeEnemies.length === 0) {
        // Respawn enemies if all dead (simple wave mechanic)
        // Reset enemies but keep score
        const rows = 3;
        const cols = 6;
        const padding = 15;
        const enemyW = 24;
        const enemyH = 18;
        const startX = (CANVAS_WIDTH - (cols * (enemyW + padding))) / 2;
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                s.enemies.push({
                x: startX + c * (enemyW + padding),
                y: 30 + r * (enemyH + padding),
                w: enemyW,
                h: enemyH,
                active: true
                });
            }
        }
        s.enemyDir = 1;
      }

      activeEnemies.forEach(e => {
        e.x += ENEMY_SPEED * s.enemyDir;
        if (e.x <= 0 || e.x + e.w >= CANVAS_WIDTH) hitEdge = true;
      });

      if (hitEdge) {
        s.enemyDir *= -1;
        activeEnemies.forEach(e => e.y += ENEMY_DROP);
      }

      // Collision Detection
      // Bullet vs Enemy
      s.bullets.forEach(b => {
        if (!b.active) return;
        s.enemies.forEach(e => {
          if (!e.active) return;
          if (
            b.x < e.x + e.w &&
            b.x + b.w > e.x &&
            b.y < e.y + e.h &&
            b.y + b.h > e.y
          ) {
            b.active = false;
            e.active = false;
            setScore(prev => prev + 100);
          }
        });
      });

      // Enemy vs Player or Bottom
      s.enemies.forEach(e => {
        if (!e.active) return;
        if (e.y + e.h >= s.player.y) {
           // Collision with player line
           setLives(prev => {
             const newLives = prev - 1;
             if (newLives <= 0) setGameStatus('gameover');
             else {
                // Reset positions
                s.player.x = CANVAS_WIDTH / 2 - 12;
                s.bullets = [];
                // Push enemies back up
                s.enemies.forEach(en => en.y = Math.min(en.y, 100)); 
             }
             return newLives;
           });
        }
      });

      // Cleanup
      s.bullets = s.bullets.filter(b => b.active);

      // Move Stars
      s.stars.forEach(star => {
        star.y += star.speed;
        if (star.y > CANVAS_HEIGHT) star.y = 0;
      });

      // --- DRAW ---
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Stars
      s.stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fillRect(star.x, star.y, 1, 1);
      });

      // Draw Player
      if (playerImg.current && playerImg.current.complete) {
          ctx.drawImage(playerImg.current, s.player.x, s.player.y, s.player.w, s.player.h);
      } else {
          // Fallback
          ctx.fillStyle = '#00ffff';
          ctx.fillRect(s.player.x, s.player.y, s.player.w, s.player.h);
      }

      // Draw Enemies
      s.enemies.forEach(e => {
        if (!e.active) return;
        if (ufoImg.current && ufoImg.current.complete) {
            ctx.drawImage(ufoImg.current, e.x, e.y, e.w, e.h);
        } else {
            // Fallback
            ctx.fillStyle = '#ff5f56';
            ctx.fillRect(e.x, e.y, e.w, e.h);
        }
      });

      // Draw Bullets
      ctx.fillStyle = '#ffff00';
      s.bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStatus, lives]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#0a0a16] border-4 border-[#00ffff]/30 rounded-b-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      style={{ aspectRatio: '4/3' }}
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]" />
      <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-b-lg" />

      {/* HUD */}
      <div className="absolute top-2 left-2 z-30 font-mono text-[10px] text-[#00ffff] drop-shadow-[0_0_2px_rgba(0,255,255,0.8)]">
        SCORE: {score.toString().padStart(5, '0')}
      </div>
      <div className="absolute top-2 right-2 z-30 font-mono text-[10px] text-[#ff5f56] drop-shadow-[0_0_2px_rgba(255,95,86,0.8)]">
        LIVES: {'♥'.repeat(lives)}
      </div>
      
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full h-full object-contain image-pixelated"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Mobile Controls (Visible on Touch Devices / Small Screens) */}
      <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-between px-4 md:hidden pointer-events-auto">
        <div className="flex gap-4">
          <button 
            className="w-12 h-12 bg-[#00ffff]/20 border-2 border-[#00ffff] rounded-full active:bg-[#00ffff]/50 text-[#00ffff] flex items-center justify-center"
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={() => handleTouchEnd('left')}
          >
            ←
          </button>
          <button 
            className="w-12 h-12 bg-[#00ffff]/20 border-2 border-[#00ffff] rounded-full active:bg-[#00ffff]/50 text-[#00ffff] flex items-center justify-center"
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={() => handleTouchEnd('right')}
          >
            →
          </button>
        </div>
        <button 
          className="w-16 h-16 bg-[#ff5f56]/20 border-2 border-[#ff5f56] rounded-full active:bg-[#ff5f56]/50 text-[#ff5f56] flex items-center justify-center font-bold"
          onTouchStart={() => handleTouchStart('fire')}
          onTouchEnd={() => handleTouchEnd('fire')}
        >
          FIRE
        </button>
      </div>

      {/* Start / Game Over Screens */}
      {gameStatus !== 'playing' && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 text-center">
          <h3 className="text-[#00ffff] font-heading text-2xl mb-2 animate-pulse">
            {gameStatus === 'start' ? 'READY PLAYER ONE' : 'GAME OVER'}
          </h3>
          
          {gameStatus === 'gameover' && (
            <div className="mb-4 font-mono text-xl text-white border-2 border-[#ff00ff] px-4 py-2 bg-[#ff00ff]/20">
              FINAL SCORE: {score}
            </div>
          )}

          <button
            onClick={initGame}
            className="px-4 py-2 bg-[#ff00ff] text-white font-mono text-xs border-2 border-white hover:bg-white hover:text-[#ff00ff] transition-colors"
          >
            {gameStatus === 'start' ? 'START MISSION' : 'RETRY MISSION'}
          </button>
          <p className="mt-4 text-gray-400 text-[10px] font-mono hidden md:block">
            ARROWS to Move • SPACE to Shoot
          </p>
        </div>
      )}
    </div>
  );
};

export default PixelShooterGame;
