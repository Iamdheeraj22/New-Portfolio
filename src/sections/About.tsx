"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Terminal } from "lucide-react";

export default function About() {
    const cards = [
        {
            title: "Mobile Development",
            description: "Building native-feeling iOS and Android apps using Flutter and Dart.",
            icon: <Smartphone className="w-8 h-8 text-primary-500 mb-4" />,
        },
        {
            title: "Scalable Architecture",
            description: "Designing apps with Clean Architecture, BLoC, and Provider for maintainability.",
            icon: <Code2 className="w-8 h-8 text-accent mb-4" />,
        },
        {
            title: "Backend Integration",
            description: "Seamlessly connecting apps to REST APIs, Firebase services, and third-party SDKs.",
            icon: <Terminal className="w-8 h-8 text-primary-500 mb-4" />,
        },
    ];

    return (
        <section id="about" className="py-16 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-8 rounded-full"
                    />
                    <p className="text-lg text-foreground/80 leading-relaxed">
                        I am a passionate Flutter Developer with 3 years of experience specializing in building
                        scalable, cross-platform applications. My journey involves crafting high-quality Android,
                        iOS, and Web applications from scratch to production. I thrive on solving complex problems,
                        optimizing performance, and ensuring seamless user experiences.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                y: { type: "spring", stiffness: 300, damping: 20 },
                                scale: { duration: 0.2 }
                            }}
                            className="glass-card p-8 transition-colors duration-300 hover:border-primary-500/30"
                        >
                            <div className="bg-primary-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
