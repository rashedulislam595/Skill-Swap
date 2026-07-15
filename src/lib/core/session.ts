import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    const user = session?.user || null;
    return user;
}

export const requireRole = async (allowedRoles: string | string[]) => {
    const user = await getUserSession();
    
    if (!user || !user.role) {
        redirect("/sign-in");
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    // Fallback safely if role is somehow undefined
    const userRole = user.role as string;
    
    if (!roles.includes(userRole)) {
        if (userRole === "admin") redirect("/dashboard/Admin");
        if (userRole === "client") redirect("/dashboard/client");
        if (userRole === "freelancer") redirect("/dashboard/freelancer");
        
        redirect("/");
    }
    
    return user;
};