"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading sequence for aesthetic purposes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: loading ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex flex-col items-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-white/10 border-t-primary-500 rounded-full mb-6"
                />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold tracking-widest text-primary-500"
                >
                    DHEERAJ<span className="text-accent">.DEV</span>
                </motion.div>

                {/* Loading progress bar */}
                <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-primary-500 to-accent"
                    />
                </div>
            </div>
        </motion.div>
    );
}
