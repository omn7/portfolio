import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				sans: ['"VT323"', 'monospace'],
				heading: ['"Press Start 2P"', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#0a0a16', // Futuristic Dark Blue/Black
				foreground: '#FFFFFF',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Portfolio specific colors
				'hero-glow': 'hsl(var(--hero-glow))',
				'section-bg': 'hsl(var(--section-bg))',
				'nav-hover': 'hsl(var(--nav-hover))',
				'skill-card': 'hsl(var(--skill-card))',
				// Retro / Futuristic Colors
				'retro-bg': '#0a0a16',
				'retro-yellow': '#FACC15',
				'retro-green': '#00ff9d',
				'retro-red': '#ff0055',
				'retro-blue': '#00d9f9',
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-accent': 'var(--gradient-accent)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card-custom': 'var(--shadow-card)',
				'retro': '4px 4px 0px 0px #000000',
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				"pulse-slow": {
					'0%, 100%': {
						transform: 'translateX(-100%)',
					},
					'50%': {
						transform: 'translateX(100%)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				"pulse-slow": "pulse-slow 3s ease-in-out infinite",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
