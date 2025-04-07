// components/header.tsx
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b">
            <div className="container max-w-screen flex h-20 items-center justify-between px-20 md:px-30 py-5">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="font-bold text-2xl">
                        Ngan's Portfolio
                    </Link>
                </div>
                <div>
                    <nav className="hidden gap-6 md:flex">
                        <Link href="/" className="hover:text-foreground/80 hover:font-bold">
                            About
                        </Link>
                        <Link href="#education" className="hover:text-foreground/80 hover:font-bold">
                            Education
                        </Link>
                        <Link href="#projects" className="hover:text-foreground/80 hover:font-bold">
                            Projects
                        </Link>
                        <Link href="#technologies" className="hover:text-foreground/80 hover:font-bold">
                            Technologies
                        </Link>
                        <Link href="#contact" className="hover:text-foreground/80 hover:font-bold">
                            Contact
                        </Link>
                    </nav>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}