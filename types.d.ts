export interface StkPushRequest {
    callbackUrl: string;
    phoneNumber: string;
    amount: number;
    accountReference: string;
    transactionDesc: string;
}

export interface StkPushResponse {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResponseCode: string;
    ResponseDescription: string;
    CustomerMessage: string;
}

export interface StkCallback {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResultCode: string;
    ResultDesc: string;
    CallbackMetadata?: {
        Item: {
            Name: string;
            Value?: string | number;
        }[];
    };
}

export interface User {
    id: string;
    phoneNumber: string;
    createdAt: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    status: "PENDING" | "SUCCESS" | "FAILED";
    mpesaReceiptNumber?: string;
    createdAt: Date;
}
