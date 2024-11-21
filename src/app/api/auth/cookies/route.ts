import { NextResponse } from "next/server";

export async function GET() {
    return { status: 200, body: { message: "Cookies route" } };
}
