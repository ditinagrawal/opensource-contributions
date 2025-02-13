import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Calendar,
    ExternalLink,
    GitBranch,
    MessageSquare,
    User,
    Code,
    Users,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const ContributorsPopup = ({ isOpen, onClose, contributors }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contributors
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                {contributors.map((contributor) => (
                    <Link
                        href={`https://github.com/${contributor.login}`}
                        target="_blank"
                        key={contributor.login}
                        className="flex items-center justify-between gap-4 p-2 rounded-lg bg-muted/50"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={contributor.avatar_url}
                                    alt={contributor.login}
                                />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">
                                    {contributor.login}
                                </p>
                                <p className="text-sm text-muted-foreground font-thin">
                                    {contributor.commits} commits
                                </p>
                            </div>
                        </div>
                        <Badge
                            variant="secondary"
                            className="ml-auto font-thin"
                        >
                            {contributor.percentage.toFixed(1)}%
                        </Badge>
                    </Link>
                ))}
            </div>
        </DialogContent>
    </Dialog>
);

const PRCard = ({ pr, index, languages, contributors }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                }}
                className="group relative bg-card/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl p-6 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 sm:h-[280px] cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold text-lg leading-tight">
                            <a
                                href={pr.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {pr.title}
                                <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {pr.labels.map((label) => (
                            <Badge
                                key={label.id}
                                variant="outline"
                                className="transition-all duration-300"
                                style={{
                                    backgroundColor: `#${label.color}15`,
                                    color: `#${label.color}`,
                                    borderColor: `#${label.color}40`,
                                }}
                            >
                                {label.name}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                        {pr.body
                            ? pr.body.slice(0, 150) +
                              (pr.body.length > 150 ? "..." : "")
                            : "No description provided."}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {new Date(pr.closed_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <GitBranch className="h-4 w-4" />
                            {pr.repository_url.split("/").slice(-1)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageSquare className="h-4 w-4" />
                            {pr.comments}
                        </span>
                        {pr.additions !== undefined &&
                            pr.deletions !== undefined && (
                                <span className="flex items-center gap-1.5">
                                    <Code className="h-4 w-4" />
                                    <span className="text-green-500">
                                        +{pr.additions}
                                    </span>
                                    <span className="text-red-500">
                                        -{pr.deletions}
                                    </span>
                                </span>
                            )}
                        <span
                            className="flex items-center gap-1.5 underline cursor-pointer text-primary/70 hover:text-primary"
                            onClick={() => setIsPopupOpen(true)}
                        >
                            <Users className="h-4 w-4" />
                            {contributors?.length || 0} contributors
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 font-mono">
                        {languages.map((language) => (
                            <Badge
                                key={language}
                                variant="outline"
                                className="tracking-wide text-muted-foreground"
                            >
                                {language}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 ring-2 ring-background">
                            <AvatarImage
                                src={pr.user.avatar_url}
                                alt={pr.user.login}
                            />
                            <AvatarFallback>
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                            {pr.user.login}
                        </span>
                    </div>
                </div>
            </motion.div>
            <ContributorsPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                contributors={contributors || []}
            />
        </>
    );
};

export default PRCard;
