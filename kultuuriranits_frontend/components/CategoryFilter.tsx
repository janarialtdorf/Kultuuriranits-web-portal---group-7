"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
    id: number;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    currentCategoryId?: string;
}

export default function CategoryFilter({ categories, currentCategoryId }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const params = new URLSearchParams(window.location.search);

        if (val) {
            params.set("categoryId", val);
        } else {
            params.delete("categoryId");
        }

        // Kui filtrit muudetakse, viskab lehekülje tagasi esimeseks (0)
        params.set("page", "0");
        router.push(`?${params.toString()}`);
    };

    return (
        <div style={{ marginBottom: "15px" }}>
            <label htmlFor="category-select" style={{ marginRight: "10px", fontWeight: "bold" }}>
                Kategooria:
            </label>
            <select
                id="category-select"
                value={currentCategoryId || ""}
                onChange={handleChange}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid gray" }}
            >
                <option value="">Kõik kategooriad</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name || `Kategooria ${cat.id}`} {/* Juhuks kui nimi on ikka null */}
                    </option>
                ))}
            </select>
        </div>
    );
}