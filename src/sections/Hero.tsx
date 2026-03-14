"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useState, useEffect } from "react";

const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);
        }
        return () => clearTimeout(timeout);
    }, [currentIndex, delay, text]);

    return <span>{displayText}</span>;
};

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Decorative floating blobs */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 45, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.15, 1],
                    rotate: [0, -45, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
            />

            <div className="container mx-auto px-6 z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center md:text-left"
                >
                    {/* Greeting */}
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                        </span>
                        <span className="text-sm font-medium">Available for new opportunities</span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                        Hi, I&apos;m <span className="text-primary-500">Dheeraj</span> Prajapat
                    </motion.h1>

                    {/* Title with Typing Effect */}
                    <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-bold text-foreground/80 mb-6 h-10 md:h-12">
                        <Typewriter text="Flutter Developer" delay={100} />
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[3px] h-[1em] ml-1 bg-primary-500 align-middle"
                        />
                    </motion.h2>

                    {/* Intro Paragraph */}
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        Building scalable cross-platform applications for Android, iOS, and Web.
                        Passionate about delivering high-performance, polished mobile experiences.
                    </motion.p>

                    {/* Buttons & Socials */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/Dheeraj-Prajapat.pdf"
                            download
                            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-xl hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download Resume
                        </motion.a>

                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://github.com/iamdheeraj22"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 glass-card rounded-xl hover:bg-white/10 transition-colors text-foreground group"
                            >
                                <Github size={20} className="group-hover:text-primary-500 transition-colors" />
                                <span className="sr-only">GitHub</span>
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://linkedin.com/in/iamdheeraj24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 glass-card rounded-xl hover:bg-white/10 transition-colors text-foreground group"
                            >
                                <Linkedin size={20} className="group-hover:text-primary-500 transition-colors" />
                                <span className="sr-only">LinkedIn</span>
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="mailto:dheerajprajapati334@gmail.com"
                                className="p-3.5 glass-card rounded-xl hover:bg-white/10 transition-colors text-foreground group"
                            >
                                <Mail size={20} className="group-hover:text-primary-500 transition-colors" />
                                <span className="sr-only">Email</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
