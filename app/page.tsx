"use client";

import { useState } from "react";

export default function Home() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/stk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber,
                    amount: Number(amount),
                    accountReference: "DemoRef",
                    transactionDesc: "Test payment",
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.CustomerMessage || "STK push sent!");
            } else {
                setMessage(data.error || "Something went wrong.");
            }
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6 text-green-700">
                    💸 M-Pesa STK Push Demo
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Phone number (2547... format)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-red-950 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Pay with M-Pesa"}
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-sm text-gray-950 bg-green-50 p-3 rounded-xl">
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}