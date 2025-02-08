import { NextResponse } from "next/server";
import { convertToZeroAfterOneDay } from "../actions/convertToZeroAfterOneDay";

export async function GET() {
  await convertToZeroAfterOneDay();
  return NextResponse.json({ success: true });
}
