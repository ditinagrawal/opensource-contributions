import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[600px]">
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-xl p-6"
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);

export default LoadingSkeleton;
