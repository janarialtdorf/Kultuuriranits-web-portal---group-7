import { Program } from "../../models/Program";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Sort from "../../components/Sort";
import CategoryFilter from "../../components/CategoryFilter";

interface FetchResult {
    content: Program[];
    totalPages: number;
}

interface Category {
    id: number;
    name: string;
}

// 1. Abifunktsioon kategooriate toomiseks andmebaasist rippmenüü jaoks
async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch("http://localhost:5050/category", { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Kategooriate pärimine ebaõnnestus:", error);
        return [];
    }
}

// 2. Programmide pärimine
async function getPrograms(
    keyword?: string,
    page: number = 0,
    sort: string = "id,asc",
    size: number = 3,
    categoryId?: string
): Promise<FetchResult> {

    // Endpoint
    let baseUrl = "http://localhost:5050/program";
    if (keyword) {
        baseUrl += "/search";
    }

    // Lehe parameetrid
    const params = new URLSearchParams();
    params.append("size", size.toString());
    params.append("sort", sort);
    params.append("page", page.toString());

    if (keyword) {
        params.append("keyword", keyword);
    }
    if (categoryId) {
        params.append("categoryId", categoryId);
    }

    const finalUrl = `${baseUrl}?${params.toString()}`;

    const res = await fetch(finalUrl, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch programs");

    const data = await res.json();

    return {
        content: data.content || [],
        totalPages: data.totalPages || 1
    };
}

export default async function ProgramsPage(props: {
    searchParams: Promise<{ keyword?: string; page?: string; sort?: string; size?: string; categoryId?: string }>
    | { keyword?: string; page?: string; sort?: string; size?: string; categoryId?: string };
}) {
    const resolvedParams = 'then' in props.searchParams ? await props.searchParams : props.searchParams;

    const keyword = resolvedParams?.keyword;
    const page = Number(resolvedParams?.page) || 0;
    const sort = resolvedParams?.sort || "id,asc";
    const size = Number(resolvedParams?.size) || 3;
    const categoryId = resolvedParams?.categoryId;
    const [programData, categories] = await Promise.all([
        getPrograms(keyword, page, sort, size, categoryId),
        getCategories()
    ]);

    const { content: programs, totalPages } = programData;

    return (
        <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Programmid</h1>

            {/* OTSING, FILTREERIMINE JA SORTEERIMINE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <SearchBar />
                    </div>
                    <Sort />
                </div>

                {/* KATEGOORIA FILTER */}
                <CategoryFilter categories={categories} currentCategoryId={categoryId} />
            </div>

            {/* TULEMUSTE KUVAMINE */}
            {programs.length === 0 ? (
                <p>
                    Otsingule või valitud kategooriale vastavaid programme ei leitud.
                </p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            style={{
                                border: "1px solid gray",
                                padding: "16px",
                                borderRadius: "8px",
                                position: "relative"
                            }}
                        >
                            <h2>{program.title}</h2>

                            {/* KUVAME KATEGOORIA MÄRGISE (Badge), KUI SEE ON OLEMAS */}
                            {program.category && (
                                <span style={{
                                    display: "inline-block",
                                    backgroundColor: "#e0e0e0",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    marginBottom: "10px",
                                    fontWeight: "bold"
                                }}>
                                    {program.category.name || `Kategooria ${program.category.id}`}
                                </span>
                            )}

                            <p>{program.description}</p>
                            <p><strong>Hind:</strong> {program.pricePerStudent}€</p>
                            <p><strong>Kestus:</strong> {program.durationMinutes} min</p>
                            <p><strong>Asukoht:</strong> {program.location}</p>
                            <p><strong>Keel:</strong> {program.language}</p>
                            <p><strong>Sihtgrupp:</strong> {program.targetGroup}</p>
                            <p><strong>Grupi suurus:</strong> {program.minGroupSize} - {program.maxGroupSize}</p>
                            <p><strong>Staatus:</strong> {program.status}</p>
                        </div>
                    ))}

                    {/* PAGINATSIOON */}
                    <Pagination page={page} totalPages={totalPages} />
                </div>
            )}
        </main>
    );
}