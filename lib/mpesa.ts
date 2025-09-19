import axios from "axios";
import { StkPushRequest, StkPushResponse } from "@/types";

const baseUrl = process.env.MPESA_BASE_URL!;
const consumerKey = process.env.MPESA_CONSUMER_KEY!;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
const shortcode = process.env.MPESA_SHORTCODE!;
const passkey = process.env.MPESA_PASSKEY!;
const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`;

export async function getToken(): Promise<string> {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const res = await axios.get(
        `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        { headers: { Authorization: `Basic ${auth}` } }
    );
    return res.data.access_token;
}

export async function stkPush(request: StkPushRequest): Promise<StkPushResponse> {
    try {
        const token = await getToken();
        const timestamp = new Date()
            .toISOString()
            .replace(/[-:TZ.]/g, "")
            .slice(0, 14);

        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

        // Choose transaction type based on shortcode type
        const transactionType =
            shortcode === "9645433" ? "CustomerPayBillOnline" : "CustomerBuyGoodsOnline";

        const payload = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: transactionType,
            Amount: request.amount,
            PartyA: request.phoneNumber,
            PartyB: shortcode,
            PhoneNumber: request.phoneNumber,
            CallBackURL: callbackUrl,
            AccountReference: request.accountReference || "TestPayment",
            TransactionDesc: request.transactionDesc || "Payment",
        };

        console.log("📤 Sending STK Push:", payload);

        const res = await axios.post(
            `${baseUrl}/mpesa/stkpush/v1/processrequest`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ STK Push Success:", res.data);
        return res.data;
    } catch (err: any) {
        console.error("❌ STK Push Error:", err.response?.data || err.message);
        throw err;
    }
}


