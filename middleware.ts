import { NextResponse, type NextRequest } from "next/server";

const APEX_HOST = "ktphotographydaman.com";
const CANONICAL_HOST = "www.ktphotographydaman.com";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host")?.split(":")[0];

  if (url.pathname === "/stories/dhavani-gaurav") {
    url.pathname = "/stories/dhwani-gaurav";
    if (host === APEX_HOST) {
      url.host = CANONICAL_HOST;
      url.port = "";
      url.protocol = "https:";
    }
    return NextResponse.redirect(url, 308);
  }

  if (host === APEX_HOST) {
    url.host = CANONICAL_HOST;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
