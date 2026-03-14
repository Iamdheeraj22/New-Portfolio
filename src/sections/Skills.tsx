"use client";

import { motion } from "framer-motion";

import { skillsData } from "@/data";
import { containerVariants, itemVariants } from "@/animations";

export default function Skills() {
    return (
        <section id="skills" className="py-16 bg-primary-900/5 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Technical Skills</h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto rounded-full"
                    />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="glass-card p-6 border border-white/5 hover:border-primary-500/40 relative overflow-hidden group"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <h3 className="text-xl font-bold mb-5 text-primary-500 relative z-10">
                                {category.category}
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-4 relative z-10"
                            >
                                {category.skills.map((skill, skillIdx) => (
                                    <motion.div key={skillIdx} variants={itemVariants} className="w-full">
                                        <div className="flex justify-between items-center mb-1 text-sm font-medium">
                                            <span>{skill.name}</span>
                                            <span className="text-primary-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-primary-600 to-accent rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 1.2, delay: skillIdx * 0.1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
