"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error when user types
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Construct mapping for mailto link
            const mailtoLink = `mailto:dheerajprajapati334@gmail.com?subject=${encodeURIComponent(
                formData.subject
            )}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open default mail client
            window.location.href = mailtoLink;

            // Show success state briefly, then reset
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
            }, 3000);
        }
    };

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
                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I&apos;ll try my best to get back to you!
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
                        <div className="p-8 lg:p-12 relative">
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-8 text-center"
                                    >
                                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Opening Mail Client...</h3>
                                        <p className="text-foreground/70">Please complete the email sending process in your default mail application.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form className="space-y-5 relative z-10" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 relative">
                                        <label htmlFor="name" className="text-xs font-medium text-foreground/70 pl-1">
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full bg-white/5 border ${errors.name ? 'border-red-500 hover:border-red-400' : 'border-white/10 hover:border-white/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all placeholder:text-foreground/20`}
                                            placeholder="John Doe"
                                        />
                                        <AnimatePresence>
                                            {errors.name && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> {errors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="space-y-1.5 relative">
                                        <label htmlFor="email" className="text-xs font-medium text-foreground/70 pl-1">
                                            Your Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500 hover:border-red-400' : 'border-white/10 hover:border-white/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all placeholder:text-foreground/20`}
                                            placeholder="john@example.com"
                                        />
                                        <AnimatePresence>
                                            {errors.email && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> {errors.email}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="space-y-1.5 relative">
                                    <label htmlFor="subject" className="text-xs font-medium text-foreground/70 pl-1">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500 hover:border-red-400' : 'border-white/10 hover:border-white/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.subject ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all placeholder:text-foreground/20`}
                                        placeholder="Project Inquiry"
                                    />
                                    <AnimatePresence>
                                        {errors.subject && (
                                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.subject}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-1.5 relative">
                                    <label htmlFor="message" className="text-xs font-medium text-foreground/70 pl-1">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.message ? 'border-red-500 hover:border-red-400' : 'border-white/10 hover:border-white/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${errors.message ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all placeholder:text-foreground/20 resize-none`}
                                        placeholder="How can I help you?"
                                    />
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all bg-primary-600 rounded-xl hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 shadow-lg shadow-primary-600/20 group mt-4 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Send Message
                                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
