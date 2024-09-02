import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        custom: {
          50: "#f9f5f9", // Fundo claro
          100: "#f3e5f5", // Texto primário claro
          200: "#d1c4e9", // Texto secundário claro
          300: "#ab47bc", // Botão claro
          400: "#8e24aa", // Botão hover claro
          500: "#4a148c", // Texto primário escuro
          600: "#6a1b9a", // Bordas e divisores
          700: "#8e24aa", // Botão hover escuro
          800: "#6a1b9a", // Bordas e divisores escuros
          900: "#4a148c", // Texto primário mais escuro
        },
        'dark-custom': {
          50: "#2e0044", // Fundo escuro
          100: "#f3e5f5", // Texto primário claro
          200: "#d1c4e9", // Texto secundário claro
          300: "#d81b60", // Botão intenso
          400: "#c2185b", // Botão hover intenso
          500: "#d1c4e9", // Texto secundário
          600: "#6a1b9a", // Bordas e divisores
          700: "#8e24aa", // Botão hover escuro
          800: "#2e0044", // Fundo escuro
          900: "#4a148c", // Texto primário mais escuro
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        kanit: ['"Kanit"'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [forms, require("tailwindcss-animate")],
}
