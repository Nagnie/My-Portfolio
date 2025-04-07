"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

// @ts-ignore
export function ThemeProvider({ Component, pageProps }) {
    return (
        <NextThemesProvider>
            <Component {...pageProps} />
        </NextThemesProvider>
    )
}