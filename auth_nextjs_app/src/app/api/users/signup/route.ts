import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { encryptPassword } from "@/helpers";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // throw new Error("Maunal: Server side error");

    const user = await User.findOne({ email });

    if (!!user) {
      console.log("User exists: ", user)
      return NextResponse.json({
        message: "User already exists"
      }, { status: 400 });
    }

    const hashedPassword = await encryptPassword(10, password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "new user created",
      success: true,
      savedUser,
      status: 201
    });


  } catch (err: any) {
    console.log("🚀 ~ file: route.ts:48 ~ POST ~ err:", err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}