"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Search, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

const ITEMS_PER_PAGE = 6;

export default function RepositoriesPage() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchAllRepos = async () => {
            try {
                // Fetching up to 100 repos for simplicity since searching is client-side
                const res = await fetch(
                    "https://api.github.com/users/iamdheeraj22/repos?sort=updated&per_page=100"
                );
                if (res.ok) {
                    const data = await res.json();
                    setRepos(data);
                }
            } catch (error) {
                console.error("Failed to fetch GitHub repos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRepos();
    }, []);

    const filteredRepos = useMemo(() => {
        return repos.filter(repo =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [repos, searchQuery]);

    const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);

    const paginatedRepos = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredRepos.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredRepos, currentPage]);

    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <div className="min-h-screen pt-32 pb-20 relative">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Back Link */}
                <Link
                    href="/#github"
                    className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            All Repositories
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-gradient-to-r from-primary-500 to-accent rounded-full"
                        />
                    </div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative w-full md:w-96"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input
                            type="text"
                            placeholder="Search repositories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-foreground/30"
                        />
                    </motion.div>
                </div>

                {/* Repos Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-card h-48 animate-pulse bg-white/5" />
                        ))}
                    </div>
                ) : filteredRepos.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            <AnimatePresence mode="popLayout">
                                {paginatedRepos.map((repo, idx) => (
                                    <motion.a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="glass-card p-6 flex flex-col h-full group border border-white/5 hover:border-primary-500/40 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <h4 className="text-lg font-bold text-primary-500 group-hover:text-primary-400 transition-colors flex items-center gap-2">
                                                <Github className="w-5 h-5" />
                                                {repo.name}
                                            </h4>
                                            <ExternalLink className="w-4 h-4 text-foreground/50 group-hover:text-accent transition-colors" />
                                        </div>

                                        <p className="text-sm text-foreground/70 mb-6 flex-grow relative z-10 line-clamp-2">
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
                                    </motion.a>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-lg border transition-all ${currentPage === page
                                                    ? "bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20"
                                                    : "bg-white/5 border-white/10 text-foreground/60 hover:bg-white/10"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 glass-card">
                        <p className="text-xl text-foreground/40">No repositories found matching your search.</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-primary-500 hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
