/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            animation: {
                "slide-in-left": "slide-in-left 0.35s ease-out",
                "slide-out-left": "slide-out-left 0.35s ease-out",
                "slide-in-right": "slide-in-right 0.35s ease-out",
                "slide-out-right": "slide-out-right 0.35s ease-out",
            },
            keyframes: {
                "slide-in-left": {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                "slide-out-left": {
                    "100%": { transform: "translateX(100%)" },
                    "0%": { transform: "translateX(0%)" },
                },
                "slide-in-right": {
                    "100%": { transform: "translateX(-100%)" },
                    "0%": { transform: "translateX(0%)" },
                },
                "slide-out-right": {
                    "100%": { transform: "translateX(-100%)" },
                    "0%": { transform: "translateX(0%)" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            height: {
                header: "var(--header-height)",
            },
            width: {
                "layout-base": "var(--layout-base)",
            },
            maxWidth: {
                "layout-base": "var(--layout-base)",
            },
        },
    },
    plugins: [],
};
