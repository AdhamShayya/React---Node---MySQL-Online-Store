import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export const tokens = (mode) => ({
    ...createContext(mode === "dark"
    ? {     
        yellow: {
          100: "#302607",
          200: "#604c0e",
          300: "#907114",
          400: "#c0971b",
          500: "#f0bd22",
          600: "#f3ca4e",
          700: "#f6d77a",
          800: "#f9e5a7",
          900: "#fcf2d3",
        },
        gray: {
          100: "#0a0a0a",
          200: "#141414",
          300: "#1f1f1f",
          400: "#292929",
          500: "#333333",
          600: "#5c5c5c",
          700: "#858585",
          800: "#adadad",
          900: "#d6d6d6",
        },
        black: {
          100: "#070707",
          200: "#0d0d0d",
          300: "#141414",
          400: "#1a1a1a",
          500: "#212121",
          600: "#4d4d4d",
          700: "#7a7a7a",
          800: "#a6a6a6",
          900: "#d3d3d3",
},

    } : {

    yellow: {
        100: "#fcf2d3",
        200: "#f9e5a7",
        300: "#f6d77a",
        400: "#f3ca4e",
        500: "#f0bd22",
        600: "#c0971b",
        700: "#907114",
        800: "#604c0e",
        900: "#302607"
      },
      gray: {
        100: "#d6d6d6",
        200: "#adadad",
        300: "#858585",
        400: "#5c5c5c",
        500: "#333333",
        600: "#292929",
        700: "#1f1f1f",
        800: "#141414",
        900: "#0a0a0a"
      },
      black: {
        100: "#d3d3d3",
        200: "#a6a6a6",
        300: "#7a7a7a",
        400: "#4d4d4d",
        500: "#212121",
        600: "#1a1a1a",
        700: "#141414",
        800: "#0d0d0d",
        900: "#070707"
},}
)
})

export const themeSettings = (mode) => {
    const colors = tokens(mode) // to return the dark or light page
    return {
       
    }
}