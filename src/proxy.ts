import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { getNewTokenWithRefreshToken, getUserInfo } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

export const refreshTokenMiddleware = async (refreshToken: string): Promise<boolean> => {
    try {
        const refresh = await getNewTokenWithRefreshToken(refreshToken);

        if (!refresh) {
            return false;
        }

        return true
    } catch (error) {
        console.log(`Error refreshing token: ${error}`);
        return false
    }
};

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

        // proactively refresh token if it is expired
        if (refreshToken && isValidAccessToken && (await isTokenExpiringSoon(accessToken))) {
            const requestheaders = new Headers(request.headers);

            const resposne = NextResponse.next({
                request: {
                    headers: requestheaders,
                },
            });

            try {
                const refreshed = await refreshTokenMiddleware(refreshToken);

                if (refreshed) {
                    requestheaders.set("x-token-refreshed", "1");
                }

                return NextResponse.next({
                    request: {
                        headers: requestheaders,
                    },
                    headers: resposne.headers,
                });
            } catch (error) {
                console.log('Error refreshing token: ', error);
            }

            return resposne;
        }

        // Rule-1: user is logged in and have access token then redirect user to dashboard page
        if (isAuth && isValidAccessToken) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }

        // Rule-2: user typing to reset password
        if (pathname === "/reset-password") {
            const email = request.nextUrl.searchParams.get("email");

            // case-1: user has NeedPasswordChange true
            if (accessToken && email) {
                const userInfo = await getUserInfo();

                if (userInfo.needPasswordChange) {
                    return NextResponse.next();
                }
                else {
                    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
                }
            }

            // case-2: user coming from forgot password page
            if (email) {
                return NextResponse.next();
            }

            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Rule-3: User trying to access public route
        if (routeOwner === null) {
            return NextResponse.next();
        }

        // Rule-4: user not logged in and typing to access protected routes then redirect user to login page

        if (!accessToken || !isValidAccessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Rule-5: Enforcing user to stay in reset password or verify email
        // if (accessToken) {
        //     const userInfo = await getUserInfo();

        //     // needPasswordChange scenario
        //     if (userInfo.needPasswordChange) {
        //         if (pathname !== "/reset-password") {
        //             const resetPasswordUrl = new URL("/reset-password", request.url);
        //             resetPasswordUrl.searchParams.set("email", userInfo.email);
        //             return NextResponse.redirect(resetPasswordUrl);
        //         }

        //         return NextResponse.next();
        //     }

        //     if (userInfo && !userInfo.needPasswordChange && pathname === "/reset-password") {
        //         return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        //     }
        // }

        // Rule-5: user typing to access common protected routes
        if (routeOwner === "COMMON") {
            return NextResponse.next();
        }

        // Rule-6: user tyring to access role based protected routes
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