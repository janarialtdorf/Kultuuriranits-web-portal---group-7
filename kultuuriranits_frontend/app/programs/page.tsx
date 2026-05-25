import { Program } from "../models/Program";
import SearchBar from "./SearchBar";

async function getPrograms(keyword?: string): Promise<Program[]> {
    const url = keyword
        ? `http://localhost:5050/program/search?keyword=${encodeURIComponent(keyword)}`
        : "http://localhost:5050/program";

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch programs");
    }

    return res.json();
}

export default async function ProgramsPage(props: {
    searchParams: Promise<{ keyword?: string }> | { keyword?: string };
}) {
    const resolvedParams = 'then' in props.searchParams ? await props.searchParams : props.searchParams;
    const keyword = resolvedParams?.keyword;

    const programs = await getPrograms(keyword);

    return (
        <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Programmid</h1>

            <SearchBar />

            {programs.length === 0 ? (
                <p style={{ color: "gray", fontStyle: "italic" }}>
                    Otsingule &quot;{keyword}&quot; vastavaid programme ei leitud.
                </p>
            ) : (
                programs.map((program) => (
                    <div
                        key={program.id}
                        style={{
                            border: "1px solid gray",
                            padding: "16px",
                            marginBottom: "16px",
                            borderRadius: "8px",
                        }}
                    >
                        <h2>{program.title}</h2>

                        <p>{program.description}</p>

                        <p>
                            <strong>Hind:</strong> {program.pricePerStudent}€
                        </p>

                        <p>
                            <strong>Kestus:</strong> {program.durationMinutes} min
                        </p>

                        <p>
                            <strong>Asukoht:</strong> {program.location}
                        </p>

                        <p>
                            <strong>Keel:</strong> {program.language}
                        </p>

                        <p>
                            <strong>Sihtgrupp:</strong> {program.targetGroup}
                        </p>

                        <p>
                            <strong>Grupi suurus:</strong>{" "}
                            {program.minGroupSize} - {program.maxGroupSize}
                        </p>

                        <p>
                            <strong>Staatus:</strong> {program.status}
                        </p>
                    </div>
                ))
            )}
        </main>
    );
}