
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html,css}"],  // ✅ Correct file paths
//   theme: {
//     extend: {
//       colors: {
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         card: 'hsl(var(--card))',
//         primary: 'hsl(var(--primary))',
//         secondary: 'hsl(var(--secondary))',
//         accent: 'hsl(var(--accent))',
//         muted: 'hsl(var(--muted))',
//         destructive: 'hsl(var(--destructive))',
//         sidebar: 'hsl(var(--sidebar-background))',
//       },
//       transitionTimingFunction: {
//         'cubic': 'cubic-bezier(0.16, 1, 0.3, 1)',   // ✅ Smoother transitions
//       },
//       transitionDuration: {
//         '200': '200ms',
//         '300': '300ms',
//       },
//       borderRadius: {
//         'lg': '0.5rem',
//         'xl': '1rem',
//         '2xl': '1.5rem',
//       }
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html,css}"],  // ✅ Correct file paths
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        destructive: 'hsl(var(--destructive))',
        sidebar: 'hsl(var(--sidebar-background))',
        
        // ✅ Added beige color
        beige: '#F5F5DC',
      },
      transitionTimingFunction: {
        'cubic': 'cubic-bezier(0.16, 1, 0.3, 1)',   // ✅ Smoother transitions
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
