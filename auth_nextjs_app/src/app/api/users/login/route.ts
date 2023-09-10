import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { isPasswordValid, setCookies, setTokenData } from "@/helpers";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User does not exists",
      }, { status: 400 })
    }

    const validPassword = isPasswordValid(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        message: "Invalid Password"
      }, { status: 400 })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    const token = await setTokenData(tokenData, "1d");

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
      user
    });

    setCookies(response, "token", token);

    return response;
  } catch (err) {
    console.log("Something went wrong: ", err);
  }
}