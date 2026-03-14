"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Github, Star, GitFork, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
}

export default function GithubSection() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const fetchRepos = async () => {
            try {
                const res = await fetch(
                    "https://api.github.com/users/iamdheeraj22/repos?sort=updated&per_page=4"
                );
                if (res.ok) {
                    const data = await res.json();
                    // Filter out forks if needed, or simply take the top 4 recently updated
                    setRepos(data.slice(0, 4));
                }
            } catch (error) {
                console.error("Failed to fetch GitHub repos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return (
        <section id="github" className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-4">
                        <Github className="w-10 h-10 text-primary-500" /> Open Source Activity
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto rounded-full"
                    />
                </motion.div>

                {/* Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-8 mb-16 flex flex-col items-center overflow-x-auto"
                >
                    <h3 className="text-xl font-bold text-foreground/90 mb-6 w-full text-center md:text-left">
                        GitHub Contributions
                    </h3>
                    <div className="w-full flex justify-center text-foreground/80 min-h-[160px] items-center">
                        {isMounted ? (
                            <GitHubCalendar
                                username="iamdheeraj22"
                                colorScheme="dark"
                                theme={{
                                    light: ['#1e1e2e', '#312e81', '#4f46e5', '#6366f1', '#818cf8'],
                                    dark: ['#1e1e2e', '#312e81', '#4f46e5', '#6366f1', '#818cf8']
                                }}
                                blockSize={14}
                                blockMargin={5}
                                fontSize={14}
                            />
                        ) : (
                            <div className="animate-pulse w-full h-[120px] bg-white/5 rounded-lg max-w-[700px]"></div>
                        )}
                    </div>
                </motion.div>

                {/* Repositories Grid */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Recent Repositories</h3>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="glass-card h-40 animate-pulse bg-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {repos.map((repo, idx) => (
                                <motion.div
                                    key={repo.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="h-full"
                                >
                                    <Link href={`/repositories/${repo.name}`} className="glass-card p-6 flex flex-col h-full group border border-white/5 hover:border-primary-500/40 relative overflow-hidden block">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <h4 className="text-lg font-bold text-primary-500 group-hover:text-primary-400 transition-colors flex items-center gap-2">
                                            <Github className="w-5 h-5" />
                                            {repo.name}
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-foreground/50 group-hover:text-accent transition-colors" />
                                    </div>

                                    <p className="text-sm text-foreground/70 mb-6 flex-grow relative z-10">
                                        {repo.description || "No description provided."}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs font-medium text-foreground/60 relative z-10">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                            <Star className="w-4 h-4" /> {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                            <GitFork className="w-4 h-4" /> {repo.forks_count}
                                        </span>
                                    </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* View All Button */}
                {!loading && repos.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link href="/repositories">
                            <motion.button
                                whileHover={{ scale: 1.05, gap: "12px" }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-primary-600 rounded-xl hover:bg-primary-500 shadow-xl shadow-primary-600/20 group"
                            >
                                View All Repositories
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
