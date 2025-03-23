// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.js", // <- WAŻNE
  ],
  theme: {
    screens: {
      ss: "250px",
      xs375: "375px",
      // => @media (min-width: 375px) { ... }
      xs: "450px",
      // => @media (min-width: 450px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1440px",
      xxl: "1440px",
      slr: "1540px",
      // => @media (min-width: 1440px) { ... }
    },

    extend: {
      maxWidth: {
        "8xl": "90rem /* 1440px */",
      },
      fontFamily: {
        monserrat: ["Montserrat", "sans-serif"],
      },
      spacing: {
        0: "0px",
        xs: "8px",
        sm: "16px",
        base: "20px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "60px",
        nav: "70px",
        "dialog-spacing": "10vh",
        "sub-dialog-spacing": "30vh",
        md: "18px",
        13: "52px",
        "slides-height": "400px",
      },
      boxShadow: {
        light: "0px 0px 10px #0000000D",
        base: "0px 0px 20px #00000054",
      },
      animation: {
        "fade-in": "wiggle 0.3s linear forwards",
        "fade-in-slow": "wiggle 0.5s linear forwards",
      },
      keyframes: {
        wiggle: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      minWidth: (theme) => ({ ...theme("width") }),
      minHeight: (theme) => ({ ...theme("height") }),
      colors: {
        primary: "#45CD77",
        price: "#18B049",
        primaryGrayText: "#7B7B7B",
        black: "#231F20",
        paper: "#FCFCF5",
        error: "#EF492E",
        line: "#373A3E",
      },
      rotate: {
        30: "-30deg",
      },
    },
    fontSize: {
      "2xs": "13px",
      xs: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "26px",
      "4xl": "34px",
      "5xl": "40px",
      "8xl": "6rem",
    },
    borderWidth: {
      0: "0px",
      DEFAULT: "1px",
      2: "2px",
      3: "3px",
    },
    colors: {
      white: "#FFF",
      black: "#000",
      "black-transparent": "#202225E6",
      warning: "#FFB406",
      gray: {
        100: "#F5F5F5  /* #F5F5F5 */",
        200: "#dbdbdb  /* #dbdbdb */",
        300: "#D1D5DB  /* #D1D5DB */",
        500: "#E8E8E8  /* #E8E8E8 */",
        600: "#707070  /* #707070 */",
        700: "#AAAAAA  /* #AAAAAA */",
        "transparent-700": "#aaaaaa80 /* #aaaaaa80 */",
        750: "#2C2F33 /* #2C2F33 */",
        800: "#202225 /* #202225 */",
        900: "#282B30 /* #282B30 */",
      },
      primary: "#46CF73",
      "primary-transparent": "#46cf734f",
      transparent: "transparent",
      error: "#FF3D3D",
      header: "#FAFAFA",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".h-nav-screen": {
          height: "calc(100vh - 110px)",
          "@media (min-width: 1280px)": {
            height: "calc(100vh - 110px)",
          },
        },
        ".min-h-nav-screen": {
          "min-height": "calc(100vh - 110px)",
          "@media (min-width: 1280px)": {
            "min-height": "calc(100vh - 110px)",
          },
        },
        ".max-h-nav-screen": {
          "max-height": "calc(100vh - 110px)",
          "@media (min-width: 1280px)": {
            "max-height": "calc(100vh - 110px)",
          },
        },
      });
    },
  ],
};
