import { NextResponse } from "next/server";


export function setCookies(response: NextResponse, cookieKey: string, cookieValue: string) {
  response.cookies.set(cookieKey, cookieValue, {
    httpOnly: true
  });
}