"use client";

import type {TypographyStylesType} from "@material-tailwind/react";
import {ButtonStyleTypes, ThemeProvider} from "@material-tailwind/react";
import React from "react";

const typographyStyles: TypographyStylesType = {
    valid: {
        colors: [
            "primary",
            //"secondary"
        ],
    },
    styles: {
        colors: {
            primary: "text-text-primary"
        }
    },
}
const buttonStyles: ButtonStyleTypes = {
    valid: {
        colors: ["primary"]
    },
    styles: {
        variants: {
          filled: {
              primary: {
                  background: "bg-white",
                  color: "text-primary-dark",
              }
          }
        },
    },
}
const theme = {
    typography: typographyStyles,
    button: buttonStyles,
}

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            value={theme}
        >
            {children}
        </ThemeProvider>
    );
}

export default Layout;
