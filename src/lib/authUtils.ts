export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export type RouteConfig = {
    exact: string[],
    pattern: RegExp[],
}

export const commonProtectedRoutes: RouteConfig = {
    pattern: [],
    exact: ["/my-profile", "/change-password"],
}

export const doctorProtectedRoutes: RouteConfig = {
    pattern: [/^\/doctor\/dashboard(?:\/.*)?$/], // matches any path that starts with "/doctor/dashboard"
    exact: [],
}

export const adminOrSuperAdminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin\/dashboard(?:\/.*)?$/], // matches any path that starts with "/admin/dashboard"
    exact: [],
}

export const patientProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard(?:\/.*)?$/], // matches any path that starts with "/dashboard"
    exact: [],
}

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }

    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    } else if (isRouteMatches(pathname, adminOrSuperAdminProtectedRoutes)) {
        return "ADMIN";
    } else if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    } else if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    }

    return null;
}

export const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case "ADMIN":
        case "SUPER_ADMIN":
            return "/admin/dashboard";
        case "DOCTOR":
            return "/doctor/dashboard";
        case "PATIENT":
            return "/dashboard";
        default:
            return "/";
    }
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

    role = unifySuperAdminAndAdminRole;

    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === "COMMON" || routeOwner === null) return true;

    if (routeOwner === role) return true;

    return false;
}