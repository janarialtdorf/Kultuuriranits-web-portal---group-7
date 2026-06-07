import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>Avaleht</h1>
            <p>Tere tulemast! || õpetaja roll</p>
            <Link href="/programs">Programmid</Link>
            <br />
        </main>
    )
};