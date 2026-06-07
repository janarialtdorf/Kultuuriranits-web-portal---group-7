"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5050/me", { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Sisselogimata");
                return res.json();
            })
            .then((user) => {
                if (user.role?.name !== "ADMIN") {
                    router.push("/login");
                } else {
                    setAuthorized(true);
                }
            })
            .catch(() => {
                router.push("/login");
            });
    }, [router]);

    if (!authorized) {
        return <p style={{ padding: "40px", textAlign: "center" }}>Kontrollin administraatori õigusi...</p>;
    }
    return <>{children}</>;
}