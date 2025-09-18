import { NextResponse } from "next/server";
import { StkCallback } from "@/types";

export async function POST(req: Request) {
    const body: { Body: { stkCallback: StkCallback } } = await req.json();
    console.log("M-Pesa Callback:", body.Body.stkCallback);
    return NextResponse.json({ status: "Callback received" });
}
