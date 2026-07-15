import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

/**
 * Returns the current session user or null.
 */
export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user ?? null;
};

/**
 * Returns the raw Better Auth session token.
 * Used to attach `Authorization: Bearer <token>` headers when calling the Express API.
 */
export const getAuthToken = async (): Promise<string | null> => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.session?.token ?? null;
};

/**
 * Enforces role-based access on server components/layouts.
 * Redirects unauthorized users to their correct destination.
 */
export const requireRole = async (allowedRoles: string | string[]) => {
    const user = await getUserSession();

    if (!user || !user.role) {
        redirect("/sign-in");
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const userRole = user.role as string;

    if (!roles.includes(userRole)) {
        if (userRole === "admin") redirect("/dashboard/Admin");
        if (userRole === "client") redirect("/dashboard/client");
        if (userRole === "freelancer") redirect("/dashboard/freelancer");
        redirect("/");
    }

    return user;
};