import jwt from "jsonwebtoken";

export async function setTokenData(tokenData: any, ttl: any) {
  return jwt.sign(tokenData,
    process.env.JWT_TOKEN_SECRET!,
    { expiresIn: ttl });
}