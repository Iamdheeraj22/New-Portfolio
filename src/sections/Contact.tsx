"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-16 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mb-8 rounded-full"
                    />
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I'll try my best to get back to you!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="glass-card overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Contact Info (Left) */}
                        <div className="p-8 lg:p-12 bg-primary-900/10 border-b lg:border-b-0 lg:border-r border-white/10">
                            <h3 className="text-2xl font-bold mb-8 text-primary-500">Contact Info</h3>

                            <div className="space-y-6">
                                <a href="mailto:dheerajprajapati334@gmail.com" className="flex items-center group">
                                    <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center mr-4 group-hover:bg-primary-500 transition-colors">
                                        <Mail className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-foreground/60 font-medium">Email</p>
                                        <p className="text-sm md:text-base font-semibold group-hover:text-primary-400 transition-colors break-all">
                                            dheerajprajapati334@gmail.com
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-center group">
                                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mr-4 group-hover:bg-accent transition-colors">
                                        <MapPin className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/60 font-medium">Location</p>
                                        <p className="text-sm md:text-base font-semibold group-hover:text-accent transition-colors">
                                            Ahmedabad, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-6">
                                    Follow Me
                                </h4>
                                <div className="flex space-x-3">
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="https://github.com/iamdheeraj22"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary-500 hover:text-white transition-all text-foreground/80"
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="https://linkedin.com/in/iamdheeraj24"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary-500 hover:text-white transition-all text-foreground/80"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Right) */}
                        <div className="p-8 lg:p-12">
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-xs font-medium text-foreground/70 pl-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-foreground/20"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-xs font-medium text-foreground/70 pl-1">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-foreground/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="subject" className="text-xs font-medium text-foreground/70 pl-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-foreground/20"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-medium text-foreground/70 pl-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-foreground/20 resize-none"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all bg-primary-600 rounded-xl hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 shadow-lg shadow-primary-600/20 group"
                                >
                                    Send Message
                                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
