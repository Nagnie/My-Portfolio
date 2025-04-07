// tailwind.config.js
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                skin: {
                    base: 'var(--color-base)',
                    muted: 'var(--color-muted)',
                    accent: 'var(--color-accent)',
                    bg: 'var(--color-bg)',
                }
            }
        }
    },
    plugins: [],
}
