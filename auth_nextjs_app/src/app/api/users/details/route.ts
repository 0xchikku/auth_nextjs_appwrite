import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers";

connect();

export async function GET(request: NextRequest) {
  try {
    const tokenData: any = await getTokenData(request);
    const user = await User.findOne({ _id: tokenData.id }).select("-password");

    return NextResponse.json({
      message: "User Data",
      user
    });

  } catch (err: any) {
    console.log("Error while getting user detail, ", err);
  }
}