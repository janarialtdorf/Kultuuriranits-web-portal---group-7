"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Hoiame kasutaja sisestatud teksti staatuses
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    // useEffect käivitub iga kord, kui 'keyword' muutub (ehk kasutaja trükib)
    useEffect(() => {
        // Kui kasutaja trükib, lükkame päringu tegemist 300ms edasi
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (keyword.trim()) {
                params.set("keyword", keyword.trim());
            } else {
                params.delete("keyword");
            }

            // Uue otsingu puhul viskame lehekülje alati tagasi esimeseks (0)
            params.set("page", "0");
            router.replace(`/programs?${params.toString()}`);
        }, 300); // 300ms ooteaeg

        return () => clearTimeout(delayDebounceFn);
    }, [keyword, router, searchParams]);

    return (
        <div style={{ marginBottom: "25px" }}>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Otsi programmi (tulemused ilmuvad trükkimise ajal)..."
                style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    maxWidth: "400px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
            />
        </div>
    );
}