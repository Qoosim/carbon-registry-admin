
/* eslint-disable consistent-return */
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const unprotectedPaths = ["/login", "/signup"];

  const isPublicPath = unprotectedPaths.includes(path);

  const user = request.cookies.get("userData")?.value || "";

  if (isPublicPath && user) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !user && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard"],
};

