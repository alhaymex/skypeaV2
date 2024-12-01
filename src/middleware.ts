import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const rootDomain = process.env.ROOT_DOMAIN || "skypea.net";

  // Check if the hostname is a subdomain
  const subdomain = hostname.replace(`.${rootDomain}`, "");

  // If this is a subdomain and not the root domain
  if (hostname !== rootDomain && hostname.endsWith(rootDomain)) {
    // Rewrite the URL to the [blogSlug] page
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, request.url)
    );
  }

  // If no subdomain or other cases, continue with the default behavior
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|static|[\\w-]+\\.\\w+).*)",
  ],
};
