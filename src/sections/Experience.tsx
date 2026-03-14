"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { experiences } from "@/data";

export default function Experience() {
    return (
        <section id="experience" className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Professional Experience</h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto rounded-full"
                    />
                </motion.div>

                <div className="relative pt-8">
                    {/* Vertical line background */}
                    <div className="absolute left-8 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-1 bg-white/5 hidden md:block rounded-full" />

                    {/* Animated vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-8 md:left-1/2 md:-ml-0.5 top-0 w-1 bg-gradient-to-b from-primary-500 via-accent to-transparent hidden md:block origin-top rounded-full"
                    />

                    <div className="space-y-16">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline icon */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                        className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary-600 border-4 border-background flex items-center justify-center -ml-4 z-10 hidden md:flex shadow-lg shadow-primary-500/50"
                                    >
                                        <Briefcase className="w-4 h-4 text-white" />
                                    </motion.div>

                                    {/* Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                                        className={`w-full md:w-1/2 ${isEven ? "md:pr-16" : "md:pl-16"
                                            }`}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="glass-card p-8 hover:border-primary-500/40 relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="relative z-10">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                                    <h3 className="text-2xl font-bold text-primary-500 group-hover:text-primary-400 transition-colors">
                                                        {exp.role}
                                                    </h3>
                                                    <span className="text-sm font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full mt-2 sm:mt-0 inline-block w-fit group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-colors">
                                                        {exp.period}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <h4 className="text-xl font-semibold">{exp.company}</h4>
                                                    <p className="text-foreground/60 text-sm">{exp.location}</p>
                                                </div>

                                                <ul className="space-y-3 mt-4">
                                                    {exp.description.map((item, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                            <span className="text-foreground/80 leading-relaxed text-sm md:text-base">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
