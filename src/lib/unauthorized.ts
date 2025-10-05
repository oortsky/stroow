import { NextResponse } from "next/server";

export function redirectUnauthorized(url: URL, reason?: string) {
  url.pathname = "/unauthorized";
  if (reason) url.searchParams.set("reason", reason);
  return NextResponse.redirect(url);
}
