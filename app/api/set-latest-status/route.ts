import { NextResponse } from "next/server";
import { setLatestStatus } from "../../../lib/db";

export async function POST(request: Request) {
  // console.info("req", req.method);
  // if (req.method !== "PUT") {
  //   return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  // }
  
  try {
    const data = await request.json();
    console.info("status", data.analysis);
    const latestStatus = await setLatestStatus(data.analysis);

    if (!latestStatus) {
      return NextResponse.json({ message: "No status found" }, { status: 404 });
    }

    return NextResponse.json({ latestStatus: latestStatus }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
