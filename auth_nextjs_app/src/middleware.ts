import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "./helpers";

export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const publicPath = ['/login', '/signup'];
  const isPublicPath = publicPath.includes(path);
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    const tokenData: any = await getTokenData(request);
    return NextResponse.redirect(new URL("/profile/" + tokenData?.username, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/signup"
  ]
}