"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationControls from "@/components/PaginationControls";
import PRCard from "@/components/PRCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, CheckCircle, Github, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModeSwitcher } from "./ModeSwitcher";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

export const GitHubPR = () => {
    const [prs, setPRs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [openPRsCount, setOpenPRsCount] = useState(0);
    const abortControllerRef = useRef(null);
    const perPage = 10;

    const username = "ditinagrawal";

    const getCachedData = useCallback((key) => {
        const cached = cache.get(key);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }
        cache.delete(key);
        return null;
    }, []);

    const setCachedData = useCallback((key, data) => {
        cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }, []);

    const fetchLanguages = async (pr) => {
        const parts = pr.repository_url.split("/repos/")[1].split("/");
        const repoOwner = parts[0];
        const repoName = parts[1];

        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/languages`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization: process.env.GITHUB_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return Object.keys(data); // Return the languages
        } catch (error) {
            console.error("Error fetching languages:", error);
            return [];
        }
    };

    const fetchOpenPRsCount = async () => {
        const response = await fetch(
            `https://api.github.com/search/issues?q=is:pr+author:${username}+is:open`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.total_count;
    };

    useEffect(() => {
        const fetchPRs = async () => {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            setLoading(true);
            const cacheKey = `prs-${username}-${page}`;

            try {
                // Check cache first
                const cachedData = getCachedData(cacheKey);
                if (cachedData) {
                    setPRs(cachedData.prs);
                    setTotalCount(cachedData.totalCount);
                    setLoading(false);
                    return;
                }

                // Fetch with abort controller
                const response = await fetch(
                    `https://api.github.com/search/issues?q=is:pr+author:${username}+is:merged&sort=updated&order=desc&page=${page}&per_page=${perPage}`,
                    { signal: abortControllerRef.current.signal }
                );

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error(
                            "Rate limit exceeded. Please try again later."
                        );
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Fetch languages for each PR
                const detailedPRs = await Promise.all(
                    data.items.map(async (pr) => {
                        const languages = await fetchLanguages(pr);
                        return {
                            ...pr,
                            languages, // Add languages to the PR object
                        };
                    })
                );

                // Cache the results
                setCachedData(cacheKey, {
                    prs: detailedPRs,
                    totalCount: data.total_count,
                });

                setPRs(detailedPRs);
                setTotalCount(data.total_count);

                // Fetch open PRs count
                const openPRsCount = await fetchOpenPRsCount();
                setOpenPRsCount(openPRsCount);
            } catch (err) {
                if (err.name === "AbortError") {
                    // Ignore abort errors
                    return;
                }
                setError(err.message || "Failed to fetch Pull Requests");
            } finally {
                setTimeout(() => setLoading(false), 200);
            }
        };

        fetchPRs();

        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [page, username, getCachedData, setCachedData]);

    const totalPages = Math.ceil(totalCount / perPage);

    if (error) {
        return (
            <Card className="w-full mx-auto bg-background/60 backdrop-blur-sm">
                <CardContent className="p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center h-32 text-red-500"
                    >
                        <p className="text-lg font-medium">{error}</p>
                    </motion.div>
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen flex flex-col"
        >
            <Card className="w-full mx-auto bg-background/60 backdrop-blur-sm border-neutral-200/50 dark:border-neutral-800/50 shadow-xl flex flex-col h-full">
                <CardHeader className="border-b border-neutral-200/50 dark:border-neutral-800/50 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <Github className="h-6 w-6 font-extrabold" />
                            My Contributions
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Link
                                href={
                                    "https://github.com/ditinagrawal/opensource-contributions"
                                }
                                target="_blank"
                                className="max-sm:hidden mr-4"
                            >
                                <Badge
                                    variant="secondary"
                                    className="text-sm px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 max-sm:hidden cursor-pointer tracking-wide"
                                >
                                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-600" />
                                    Star on Github
                                    <ArrowUpRight className="h-4 w-4 ms-1" />
                                </Badge>
                            </Link>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 max-sm:hidden tracking-wide"
                            >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                All Merged
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-sm px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 max-sm:hidden tracking-wide"
                            >
                                Open PRs: {openPRsCount}
                            </Badge>
                            <ModeSwitcher />
                        </div>
                    </div>
                </CardHeader>

                <ScrollArea className="flex-grow">
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <LoadingSkeleton key="skeleton" />
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[600px]"
                                >
                                    {prs.map((pr, index) => (
                                        <PRCard
                                            key={pr.id}
                                            pr={pr}
                                            index={index}
                                            languages={pr.languages}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollArea>

                <div className="flex-shrink-0">
                    <PaginationControls
                        page={page}
                        totalPages={totalPages}
                        loading={loading}
                        setPage={setPage}
                        totalCount={totalCount}
                    />
                </div>
            </Card>
        </motion.div>
    );
};
