"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Person } from "../../models/Person";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // Hoiame vormi andmeid Person mudeli kujul
    const [formData, setFormData] = useState<Person>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        personalCode: "",
    });

    // Juhuks, kui tahad arenduse ajal lubada kasutajal ise rolli valida:
    const [selectedRoleId, setSelectedRoleId] = useState<number>(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Paneme rolli objekti kaasa vastavalt valikule
        const payload = {
            ...formData,
            role: {
                id: selectedRoleId,
                name: selectedRoleId === 2 ? "CULTURAL_INSTITUTION" : "TEACHER"
            }
        };

        try {
            const API_URL = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5050";

            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include", // Haldab sessiooniküpsiseid
            });

            if (!res.ok) {
                // Kui backend viskab vea (nt vigane isikukood või e-mail olemas)
                const errorData = await res.json();
                throw new Error(errorData.message || "Registreerumine ebaõnnestus.");
            }

            setSuccess(true);
            // Suuname kasutaja 2 sekundi pärast sisselogimise lehele
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Midagi läks valesti...");
            }
        }
    };

    if (success) {
        return (
            <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center", color: "green" }}>
                <h2>Kasutaja loodud!</h2>
                <p>Suuname sind sisselogimise lehele...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ marginBottom: "20px" }}>Loo uus konto</h2>

            {error && <p style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Eesnimi</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Perekonnanimi</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Parool</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Isikukood</label>
                    <input type="text" name="personalCode" value={formData.personalCode} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Konto tüüp</label>
                    <select value={selectedRoleId} onChange={(e) => setSelectedRoleId(Number(e.target.value))} style={{ width: "100%", padding: "8px" }}>
                        <option value={1}>Õpetaja (TEACHER)</option>
                        <option value={2}>Kultuuriasutus (CULTURAL_INSTITUTION)</option>
                    </select>
                </div>

                <button type="submit" style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}>
                    Registreeru
                </button>
            </form>
        </div>
    );
}