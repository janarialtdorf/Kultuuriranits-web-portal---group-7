import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>Avaleht</h1>
            <p>Tere tulemast! || kultuuriasutuse roll</p>
            <Link href="/addPrograms">Lisa uus programm</Link>
            <br />
        </main>
    )
};