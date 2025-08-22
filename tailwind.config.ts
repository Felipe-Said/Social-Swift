import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", '[data-theme="dark"]'],
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
				'sf': ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Design System Colors
				bg: 'hsl(var(--bg))',
				'bg-sub': 'hsl(var(--bg-sub))',
				text: 'hsl(var(--text))',
				'text-dim': 'hsl(var(--text-dim))',
				brand: {
					DEFAULT: 'hsl(var(--brand))',
					glow: 'hsl(var(--brand-glow))'
				},
				status: {
					like: 'hsl(var(--like))',
					info: 'hsl(var(--info))',
					warn: 'hsl(var(--warn))',
					success: 'hsl(var(--success))'
				},
				
				// Legacy shadcn support
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				}
			},
			borderRadius: {
				'pill': 'var(--radius-pill)',
				'brand': 'var(--radius)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 8px)'
			},
			backdropBlur: {
				'brand': 'var(--blur)'
			},
			boxShadow: {
				'brand': 'var(--shadow)',
				'glow': '0 0 20px hsl(var(--brand) / 0.3)',
				'glow-lg': '0 0 40px hsl(var(--brand) / 0.4)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--brand) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--brand) / 0.5)' }
				},
				'heart-beat': {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.2)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.2)' },
					'70%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'heart-beat': 'heart-beat 1s ease-in-out'
			},
			screens: {
				'xs': '390px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
