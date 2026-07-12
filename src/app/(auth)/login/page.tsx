"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// ─── Role-based redirect map ───────────────────────────────────────────────────
const ROLE_REDIRECT: Record<string, string> = {
  client:     "/",
  freelancer: "/dashboard/freelancer",
  admin:      "/dashboard/admin",
};

// ─── Google Icon SVG ───────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Redirect user to the correct path based on their role */
  const redirectByRole = (role: string) => {
    const path = ROLE_REDIRECT[role] ?? "/";
    router.push(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email:    formData.email,
      password: formData.password,
      callbackURL: "/",
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        (error as { message?: string }).message ?? "Invalid email or password.",
        {
          position: "top-center",
          theme: "colored",
        }
      );
      return;
    }

    const userName  = (data?.user as { name?: string })?.name ?? "there";
    const userRole  = (data?.user as { role?: string })?.role  ?? "client";

    toast.success(
      <div>
        <p className="font-semibold text-sm">👋 Welcome back, {userName.split(" ")[0]}!</p>
        <p className="text-xs mt-0.5 opacity-90">You are signed in. Redirecting…</p>
      </div>,
      {
        position: "top-center",
        autoClose: 2500,
      }
    );

    setTimeout(() => redirectByRole(userRole), 1600);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (data) {
        toast.success("Redirecting to Google...", {
          position: "top-center",
        });
      } else {
        
        toast.error(error.message || "Google sign-in failed.", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google sign-in failed.";
      toast.error(message, { position: "top-center", theme: "colored" });
    } finally {
      setGoogleLoading(false);
    }
  };


  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-200">

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-zinc-950 backdrop-blur-sm overflow-hidden">

          {/* Top gradient stripe */}
          <div className="h-1 w-full bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600" />

          <div className="px-8 pt-8 pb-10">

            {/* Header */}
            <div className="mb-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 justify-center group mb-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-200">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkillSwap
                </span>
              </Link>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Sign in to continue to your account
              </p>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 h-11 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 shadow-sm transition-all duration-150 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
            >
              {googleLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-500" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">or sign in with email</span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-150"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-10 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || googleLoading}
                className="mt-2 w-full h-11 rounded-md bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Role redirect info */}
            <div className="mt-5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 px-4 py-3">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed text-center">
                <span className="font-semibold text-zinc-500 dark:text-zinc-400">Clients</span> are redirected to the Home page.{" "}
                <span className="font-semibold text-zinc-500 dark:text-zinc-400">Freelancers & Admins</span> go directly to their Dashboard.
              </p>
            </div>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150"
              >
                Create one
              </Link>
            </p>

          </div>
        </div>

        {/* Terms note */}
        <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500 px-4">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
