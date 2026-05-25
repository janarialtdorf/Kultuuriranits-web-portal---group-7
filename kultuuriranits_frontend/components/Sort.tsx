"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Sort() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Loeme URL-ist hetke suuruse, et select näitaks õiget väärtust
    const currentSize = Number(searchParams.get("size")) || 3;

    const sizeHandler = (newSize: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("size", newSize.toString());
        params.set("page", "0"); // Reset leheküljele 0
        router.push(`?${params.toString()}`);
    }

    const sortHandler = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", newSort);
        params.set("page", "0"); // Reset leheküljele 0
        router.push(`?${params.toString()}`);
    }

    return (
        <div style={{ margin: "16px 0" }}>
            {/* Elementide arvu valik lehel */}
            <select value={currentSize} onChange={(e) => sizeHandler(Number(e.target.value))}>
                <option value={1}>1 lehel</option>
                <option value={2}>2 lehel</option>
                <option value={3}>3 lehel</option>
                <option value={4}>4 lehel</option>
            </select>

            <br /><br />

            {/* Sorteerimise nupud */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => sortHandler("id,asc")}>Sorteeri vanemad enne</button>
                <button onClick={() => sortHandler("id,desc")}>Sorteeri uuemad enne</button>
                <button onClick={() => sortHandler("title,asc")}>Sorteeri A-Z (Pealkiri)</button>
                <button onClick={() => sortHandler("title,desc")}>Sorteeri Z-A (Pealkiri)</button>
                <button onClick={() => sortHandler("pricePerStudent,asc")}>Sorteeri hind kasvavalt</button>
                <button onClick={() => sortHandler("pricePerStudent,desc")}>Sorteeri hind kahanevalt</button>
            </div>
        </div>
    )
}