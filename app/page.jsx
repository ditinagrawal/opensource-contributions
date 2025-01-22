"use client";

import { useSearchParams } from "next/navigation";
import { GitHubPR } from "@/components/GithubPR";

export default function Home() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    return (
        <main>
            <GitHubPR name={name || "ditinagrawal"} />
        </main>
    );
}
