import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getTokenData(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  return jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
}