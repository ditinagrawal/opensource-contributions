"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import PaginationControls from "@/components/PaginationControls";
import PRCard from "@/components/PRCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Github } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const GitHubPR = () => {
    const [prs, setPRs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;

    const username = "ditinagrawal";

    useEffect(() => {
        const fetchPRs = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.github.com/search/issues?q=is:pr+author:${username}+is:merged&sort=updated&order=desc&page=${page}&per_page=${perPage}`
                );
                const data = await response.json();
                setPRs(data.items);
                setTotalCount(data.total_count);
            } catch (err) {
                setError("Failed to fetch Pull Requests");
            } finally {
                setTimeout(() => setLoading(false), 200);
            }
        };

        fetchPRs();
    }, [page]);

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
                        <Badge
                            variant="secondary"
                            className="text-sm px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            All Merged
                        </Badge>
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
