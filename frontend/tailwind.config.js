module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      primary: "#FF5844",
      textPrimary: "#1F1F1F",
      online: "#80F575",
      bgPrimary: "#FFFFFF",
      bgSecondary: "#E5E5E5",
      border: "#e8e8e8",
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
