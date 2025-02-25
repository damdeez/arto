import { NextResponse } from "next/server";
import { getLatestStatus } from "../../../lib/db";

export async function GET() {
  try {
    const latestStatus = await getLatestStatus();

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
// Rewrite this for Next.js API Routes
