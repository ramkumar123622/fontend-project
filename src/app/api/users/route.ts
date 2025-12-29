
import { NextRequest, NextResponse } from "next/server";




export async function GET(Request:NextRequest) {
    const params = Request.nextUrl.searchParams;
    console.log(params.get('name'))

    return NextResponse.json({ name:'Ram'}, {status:200})
}


export async function POST(request:NextResponse) {
    const Body = await request.json();
    console.log("Request Body:", Body);
    return NextResponse.json({ name: "John Doe" }, { status: 200});
}