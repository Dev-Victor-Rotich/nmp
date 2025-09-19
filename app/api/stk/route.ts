import { NextResponse } from "next/server";
import { stkPush } from "@/lib/mpesa";
import { StkPushRequest } from "@/types";

export async function POST(req: Request) {
    try {
        const body: StkPushRequest = await req.json();

        // Validate required fields
        if (!body.phoneNumber || !body.amount) {
            return NextResponse.json(
                { error: "phoneNumber and amount are required" },
                { status: 400 }
            );
        }

        // Inject default callback if not provided
        const response = await stkPush({
            ...body,
            callbackUrl: body.callbackUrl || `${process.env.BASE_URL}/api/callback`,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        // Return detailed error instead of generic 500
        console.error("STK Push Error:", error?.response?.data || error.message);

        return NextResponse.json(
            {
                error: "STK Push failed",
                details: error?.response?.data || error.message,
            },
            { status: 400 }
        );
    }
}
