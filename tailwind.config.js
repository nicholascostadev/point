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
                "spotlight-radial":
                    "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),var(--transparent))",
                "conic-gradient":
                    "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
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
            minHeight: {
                "with-header": "calc(100vh - var(--header-height))",
            },
            margin: {
                "header-height": "var(--header-height)",
                "header-height-alert": "calc(var(--header-height) + 3.95rem)",
            },
            padding: {
                "header-height": "var(--header-height)",
                "header-height-alert": "calc(var(--header-height) + 3.95rem)",
            },
        },
    },
    plugins: [require("@thoughtbot/tailwindcss-aria-attributes")],
};
