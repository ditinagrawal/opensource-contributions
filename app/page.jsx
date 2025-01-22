"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GitHubPR } from "@/components/GithubPR";

export default function Home() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsWrapper />
            </Suspense>
        </main>
    );
}

function SearchParamsWrapper() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");

    return <GitHubPR name={name || "ditinagrawal"} />;
}
