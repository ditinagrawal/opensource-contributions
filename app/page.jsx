"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GitHubPR } from "@/components/GithubPR";

export default function Home() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <GitHubPR name={name || "ditinagrawal"} />
            </Suspense>
        </main>
    );
}
