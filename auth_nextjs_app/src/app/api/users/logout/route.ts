import { NextResponse } from "next/server";
import { setCookies } from "@/helpers";

export async function GET() {
  console.log("🚀 ~ file: logout.ts:4 ~ GET ~ GET:");
  try {

    const response = NextResponse.json({
      message: "Logged Out Successfully",
      success: true
    });

    setCookies(response, "token", "");

    return response;

  } catch (err) {
    console.log("Error while logging out: ", err);
    return NextResponse.json({
      message: "Error while logging out"
    }, { status: 500 });
  }
}