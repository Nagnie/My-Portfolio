// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import React from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Thao Ngan | Portfolio",
    description: "Portfolio cá nhân được xây dựng với Next.js và Tailwind CSS",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
    )
}