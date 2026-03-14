"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#github" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname !== "/") return null;

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#hero" className="text-2xl font-bold tracking-tighter">
                    Dheeraj<span className="text-primary-500">.dev</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 hover:text-primary-500 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full glass border-t border-white/10 p-6 md:hidden flex flex-col space-y-4 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-foreground hover:text-primary-500 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
