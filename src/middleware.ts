import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const rootDomain = process.env.ROOT_DOMAIN || "yourdomain.com";

  console.log("Middleware: Hostname:", hostname); // Add this line for debugging
  console.log("Middleware: Root Domain:", rootDomain); // Add this line for debugging

  // Check if the hostname is a subdomain
  const subdomain = hostname.replace(`.${rootDomain}`, "");

  console.log("Middleware: Subdomain:", subdomain); // Add this line for debugging

  // If this is a subdomain and not the root domain
  if (hostname !== rootDomain && hostname.endsWith(rootDomain)) {
    console.log(
      "Middleware: Rewriting to:",
      `/app/${subdomain}${url.pathname}`
    ); // Add this line for debugging
    // Rewrite the URL to the blog page
    return NextResponse.rewrite(
      new URL(`/app/${subdomain}${url.pathname}`, request.url)
    );
  }

  // If no subdomain or other cases, continue with the default behavior
  console.log("Middleware: Continuing with default behavior"); // Add this line for debugging
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|[\\w-]+\\.\\w+).*)"],
};
