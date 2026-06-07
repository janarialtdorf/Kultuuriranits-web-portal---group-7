"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CulturalInstitutionLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5050/me", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((user) => {
                if (!user || user.role?.name !== "CULTURAL_INSTITUTION") {
                    router.push("/login");
                } else {
                    setAuthorized(true);
                }
            });
    }, [router]);

    if (!authorized) {
        return <p style={{ padding: "40px", textAlign: "center" }}>Kontrollin asutuse õigusi...</p>;
    }
    return <>{children}</>;
}