"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Star, GitFork, Eye, AlertCircle, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Skeleton } from "@/components/ui/Skeleton";

interface RepoDetails {
// ... existing interface ...
// (Note: I will use the actual lines below)

    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    topics: string[];
    updated_at: string;
}

interface Languages {
    [key: string]: number;
}

export default function RepositoryDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const repoName = params.repoName as string;

    const [repo, setRepo] = useState<RepoDetails | null>(null);
    const [languages, setLanguages] = useState<Languages | null>(null);
    const [readme, setReadme] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!repoName) return;

        const fetchRepoData = async () => {
            try {
                // Fetch basic repository details
                const repoRes = await fetch(`https://api.github.com/repos/iamdheeraj22/${repoName}`);
                if (repoRes.ok) {
                    setRepo(await repoRes.json());
                }

                // Fetch languages
                const langRes = await fetch(`https://api.github.com/repos/iamdheeraj22/${repoName}/languages`);
                if (langRes.ok) {
                    setLanguages(await langRes.json());
                }

                // Fetch Readme (using standard Accept header for raw text)
                const readmeRes = await fetch(`https://api.github.com/repos/iamdheeraj22/${repoName}/readme`, {
                    headers: { Accept: "application/vnd.github.v3.raw" }
                });
                if (readmeRes.ok) {
                    setReadme(await readmeRes.text());
                } else {
                    setReadme("No README provided for this repository.");
                }

            } catch (error) {
                console.error("Failed to fetch repository data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoData();
    }, [repoName]);

    if (loading) {
        return (
            <div className="min-h-screen pb-20 relative">
                <div className="sticky top-0 left-0 w-full z-50 glass py-4 border-b border-white/5 mb-8">
                    <div className="container mx-auto px-6 max-w-5xl flex items-center">
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    {/* Header Skeleton */}
                    <div className="glass-card p-8 mb-8 border border-white/10">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <Skeleton className="h-12 w-1/2" />
                                <Skeleton className="h-6 w-3/4" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                                <Skeleton className="h-12 w-48 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:w-64 shrink-0">
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 glass-card p-8 border border-white/10 space-y-6">
                            <Skeleton className="h-8 w-40" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                        <div className="glass-card p-6 border border-white/10 h-fit space-y-6">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-3 w-full rounded-full" />
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!repo) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center text-center px-6">
                <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-3xl font-bold mb-4">Repository Not Found</h1>
                <p className="text-foreground/70 mb-8 max-w-md">We couldn&apos;t fetch details for <span className="text-primary-500 font-mono">{repoName}</span>. It might be private or doesn&apos;t exist.</p>
                <Link href="/repositories" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    Back to Repositories
                </Link>
            </div>
        );
    }

    // Calculate total lines for language progress bars
    const totalLines = languages ? Object.values(languages).reduce((a, b) => a + b, 0) : 0;
    
    // Auto-generate colors for languages based on string length/char codes to be consistent per language
    const getLangColor = (lang: string) => {
        const colors = ['bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'];
        const hash = lang.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    return (
        <div className="min-h-screen pb-20 relative">
            {/* Top Bar with Back Button */}
            <div className="sticky top-0 left-0 w-full z-50 glass py-4 border-b border-white/5 mb-8">
                <div className="container mx-auto px-6 max-w-5xl flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-sm font-bold text-foreground hover:text-primary-500 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back 
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">

                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 mb-8 border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 filter pointer-events-none">
                        <Github className="w-64 h-64 text-primary-500 transform rotate-12" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4 flex-wrap text-primary-500">
                                {repo.name}
                            </h1>
                            <p className="text-lg text-foreground/80 mb-6 leading-relaxed max-w-3xl">
                                {repo.description || "No description provided."}
                            </p>

                            {/* Topics */}
                            {repo.topics && repo.topics.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {repo.topics.map(topic => (
                                        <span key={topic} className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full border border-primary-500/20 font-medium">
                                            #{topic}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                                <a 
                                    href={repo.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    <Github className="w-5 h-5" /> View on GitHub <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="grid grid-cols-2 gap-4 md:w-64 shrink-0">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <Star className="w-6 h-6 text-yellow-500 mb-2" />
                                <span className="text-xl font-bold">{repo.stargazers_count}</span>
                                <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Stars</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <GitFork className="w-6 h-6 text-blue-400 mb-2" />
                                <span className="text-xl font-bold">{repo.forks_count}</span>
                                <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Forks</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <Eye className="w-6 h-6 text-green-400 mb-2" />
                                <span className="text-xl font-bold">{repo.watchers_count}</span>
                                <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Watchers</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
                                <span className="text-xl font-bold">{repo.open_issues_count}</span>
                                <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Issues</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-8 text-sm text-foreground/40 font-medium border-t border-white/10 pt-4 relative z-10">
                        <Calendar className="w-4 h-4" /> Last updated: {new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Readme Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 glass-card p-4 md:p-8 border border-white/10 overflow-hidden"
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <h2 className="text-2xl font-bold flex items-center gap-2">README.md</h2>
                        </div>
                        <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-full break-words prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-img:rounded-xl prose-img:max-w-full prose-pre:bg-[#1e1e2e] prose-pre:border prose-pre:border-white/10 prose-pre:max-w-full prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto">
                            {readme ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {readme}
                                </ReactMarkdown>
                            ) : (
                                <p className="text-foreground/50 italic">Processing README...</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Languages Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 w-full"
                    >
                        <div className="glass-card p-6 border border-white/10 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Languages</h3>
                            
                            {languages && Object.keys(languages).length > 0 ? (
                                <div>
                                    {/* Progress Bar representation */}
                                    <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-white/5">
                                        {Object.entries(languages).map(([lang, count]) => (
                                            <div 
                                                key={lang}
                                                className={`h-full ${getLangColor(lang)}`}
                                                style={{ width: `${(count / totalLines) * 100}%` }}
                                                title={`${lang}: ${((count / totalLines) * 100).toFixed(1)}%`}
                                            />
                                        ))}
                                    </div>

                                    {/* Language Labels */}
                                    <div className="flex flex-col gap-3">
                                        {Object.entries(languages).map(([lang, count]) => {
                                            const percentage = ((count / totalLines) * 100).toFixed(1);
                                            return (
                                                <div key={lang} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-3 h-3 rounded-full ${getLangColor(lang)}`} />
                                                        <span className="font-semibold text-foreground/90">{lang}</span>
                                                    </div>
                                                    <span className="text-foreground/50 font-medium">{percentage}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-foreground/50 text-sm">No language data available.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

