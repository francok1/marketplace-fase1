import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "#10b981",
          light: "#ecfdf5",
          dark: "#065f46",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fffbeb",
          dark: "#78350f",
        },
        error: {
          DEFAULT: "#ef4444",
          light: "#fee2e2",
          dark: "#7f1d1d",
        },
        info: {
          DEFAULT: "#3b82f6",
          light: "#eff6ff",
          dark: "#1e3a8a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        "3xl": "0 35px 60px -15px rgb(0 0 0 / 0.3)",
        "glass":
          "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 8px 16px 0 rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        glass: "10px",
      },
      opacity: {
        glass: "0.8",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.3s ease-out",
        slideDown: "slideDown 0.3s ease-out",
        slideLeft: "slideLeft 0.3s ease-out",
        slideRight: "slideRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            transform: "translateY(10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideDown: {
          "0%": {
            transform: "translateY(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideRight: {
          "0%": {
            transform: "translateX(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
      },
      spacing: {
        gutter: "var(--gutter, 1rem)",
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(function ({
      addBase,
      addComponents,
      addUtilities,
    }) {
      // Agregar estilos base
      addBase({
        ":root": {
          "--background": "0 0% 100%",
          "--foreground": "0 0% 3.6%",
          "--card": "0 0% 100%",
          "--card-foreground": "0 0% 3.6%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "0 0% 3.6%",
          "--muted": "0 0% 96.1%",
          "--muted-foreground": "0 0% 45.1%",
          "--accent": "0 84.2% 60.2%",
          "--accent-foreground": "0 0% 100%",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "0 0% 100%",
          "--border": "0 0% 89.8%",
          "--input": "0 0% 89.8%",
          "--primary": "0 0% 9%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "0 0% 14.9%",
          "--secondary-foreground": "0 0% 100%",
          "--ring": "0 0% 3.6%",
          "--radius": "0.5rem",
        },
        ".dark": {
          "--background": "0 0% 3.6%",
          "--foreground": "0 0% 98.2%",
          "--card": "0 0% 9%",
          "--card-foreground": "0 0% 98.2%",
          "--popover": "0 0% 9%",
          "--popover-foreground": "0 0% 98.2%",
          "--muted": "0 0% 14.9%",
          "--muted-foreground": "0 0% 63.9%",
          "--accent": "0 84.2% 60.2%",
          "--accent-foreground": "0 0% 9%",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "0 0% 98.2%",
          "--border": "0 0% 14.9%",
          "--input": "0 0% 14.9%",
          "--primary": "0 0% 98.2%",
          "--primary-foreground": "0 0% 9%",
          "--secondary": "0 0% 89.8%",
          "--secondary-foreground": "0 0% 9%",
          "--ring": "0 84.2% 60.2%",
        },
      });

      // Agregar componentes comunes
      addComponents({
        ".container": {
          "@apply mx-auto px-4 sm:px-6 lg:px-8": {},
        },
        ".btn": {
          "@apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed":
            {},
        },
        ".input": {
          "@apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm":
            {},
        },
      });

      // Agregar utilidades personalizadas
      addUtilities({
        ".text-balance": {
          textWrap: "balance",
        },
        ".text-pretty": {
          textWrap: "pretty",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".glass-effect": {
          "@apply backdrop-blur-glass bg-white/glass border border-white/20 shadow-glass":
            {},
        },
      });
    }),
  ],
};

export default config;
