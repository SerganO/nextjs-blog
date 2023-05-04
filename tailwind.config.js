/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    customForms: (theme) => ({
      default: {
        input: {
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.gray.200"),
          "&:focus": {
            backgroundColor: theme("colors.white"),
          },
        },
        select: {
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.gray.700"),
          boxShadow: theme("boxShadow.default"),
          lineHeight: theme("lineHeight.snug"),
          icon: '<svg fill="#ffffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>',
        },
        "checkbox, radio": {
          width: theme("spacing.6"),
          height: theme("spacing.6"),
          backgroundColor: theme("colors.gray.900"),
          "&:focus": {
            backgroundColor: theme("colors.gray.700"),
          },
        },
      },
    }),
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      4.8: "1.2rem",
      5: "1.25rem",
      5.2: "1.3rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
    },
    extend: {
      fontSize: {
        xlg: "1.2rem",
        "3.5xl": "2rem",
        "4.5xl": "2.5rem",
      },
      padding: {
        "5/6": "83.3333333%",
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/custom-forms"),
  ],
};
