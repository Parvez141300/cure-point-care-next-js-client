import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl; // eg: /dashboard or /admin/dashboard
        const accessToken = request.cookies.get("accessToken")?.value || "";
        const refreshToken = request.cookies.get("refreshToken")?.value || "";

        let userRole: UserRole | null = null;

        const deocodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!).data;

        const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!).success;

        if (deocodedAccessToken) {
            userRole = deocodedAccessToken.role as UserRole;
        }

        const routeOwner = getRouteOwner(pathname);

        const unifySuperAdminAndAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;

        userRole = unifySuperAdminAndAdminRole;

        const isAuth = isAuthRoute(pathname);

        // Rule-1: user is logged in and have access token then redirect user to dashboard page
        if (isAuth && isValidAccessToken) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        // Rule-2: User trying to access public route
        if (routeOwner === null) {
            return NextResponse.next();
        }

        // Rule-3: user not logged in and typing to access protected routes then redirect user to login page

        if(!accessToken || !isValidAccessToken){
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Rule-4: user typing to access common protected routes
        if (routeOwner === "COMMON") {
            return NextResponse.next();
        }

        // Rule-5: user tyring to access role based protected routes
        if (routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT") {
            if (routeOwner !== userRole) {
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.log(`Error is proxy middleware: ${error}`);
    }


}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * 1. /api routes
         * 2. /_next/static files
         * 3. /_next/image optimization files
         * 4. /favicon.ico
         * 5. /sitemap.xml
         * 6. /robots.txt
         */

        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}