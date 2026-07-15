"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, ImageIcon, Lock, Check, X, ChevronRight, Code2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// ─── Password Validation Rules ────────────────────────────────────────────────
const passwordRules = [
  { id: "length",  label: "At least 6 characters",    test: (p: string) => p.length >= 6 },
  { id: "upper",   label: "At least one capital letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower",   label: "At least one lowercase letter", test: (p: string) => /[a-z]/.test(p) },
];

// ─── Google Icon SVG ──────────────────────────────────────────────────────────
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

// ─── Role-based redirect map ─────────────────────────────────────────────────
const ROLE_REDIRECT: Record<string, string> = {
  client:     "/",
  freelancer: "/dashboard/freelancer",
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: "",
    password: "",
    role: "client" as "client" | "freelancer",
    skills: "",
    bio: "",
    hourlyRate: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const passwordChecks = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(formData.password),
  }));
  const passwordValid = passwordChecks.every((r) => r.passed);
  const showPasswordHints = formData.password.length > 0;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: "client" | "freelancer") => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid) return;
    setIsLoading(true);

    const { error } = await authClient.signUp.email({
      name:     formData.name,
      email:    formData.email,
      password: formData.password,
      image:    formData.imageUrl || undefined,
      // extra fields stored alongside the user
      role:        formData.role,
      skills:      formData.role === "freelancer" ? formData.skills : undefined,
      bio:         formData.role === "freelancer" ? formData.bio : undefined,
      hourlyRate:  formData.role === "freelancer" && formData.hourlyRate
                     ? Number(formData.hourlyRate)
                     : undefined,
    } as Parameters<typeof authClient.signUp.email>[0]);

    setIsLoading(false);

    if (error) {
      toast.error(
        (error as { message?: string }).message ?? "Registration failed. Please try again.",
        {
          position: "top-center",
          theme: "colored",
        }
      );
      return;
    }

    toast.success(
      <div>
        <p className="font-semibold text-sm">🎉 Account created successfully!</p>
        <p className="text-xs mt-0.5 opacity-90">
          Welcome to SkillSwap, {formData.name.split(" ")[0]}! Redirecting you now…
        </p>
      </div>,
      {
        position: "top-center",
      }
    );

    // Redirect after a short delay so the user can read the toast
    setTimeout(() => {
      router.push(ROLE_REDIRECT[formData.role] ?? "/");
    }, 1800);
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth-callback",
      });
      if (data) {
        toast.success("Redirecting to Google...", {
          position: "top-center",
        })
      } else {
        toast.error(error.message || "Google sign-up failed.", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google sign-up failed.";
      toast.error(message, { position: "top-center", theme: "colored" });
    } finally {
      setGoogleLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-200">

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl" />
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
                Create your account
              </h1>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Join thousands of skilled professionals today
              </p>
            </div>

            {/* Google Sign-Up (always Client) */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 h-11 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 shadow-sm transition-all duration-150 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
            >
              {googleLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-500" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
              <span className="ml-auto text-[10px] font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                Client only
              </span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">or sign up with email</span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-150"
                  />
                </div>
              </div>

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

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="imageUrl" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Profile Image URL
                  <span className="ml-1.5 normal-case font-normal text-zinc-400">(optional)</span>
                </label>
                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    autoComplete="off"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-150"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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

                {/* Password strength hints */}
                {showPasswordHints && (
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {passwordChecks.map((rule) => (
                      <li key={rule.id} className="flex items-center gap-2 text-xs">
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ${rule.passed ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`}>
                          {rule.passed
                            ? <Check className="h-2.5 w-2.5 text-white" />
                            : <X className="h-2.5 w-2.5 text-zinc-400 dark:text-zinc-500" />
                          }
                        </span>
                        <span className={rule.passed ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}>
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Role Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  I want to join as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Client */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("client")}
                    className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 py-4 px-3 text-sm font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
                      formData.role === "client"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-md shadow-blue-500/10"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    {formData.role === "client" && (
                      <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </span>
                    )}
                    <span className="text-2xl">🧑‍💼</span>
                    <span>Client</span>
                    <span className="text-[10px] font-normal opacity-70 text-center">Hire talent</span>
                  </button>

                  {/* Freelancer */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("freelancer")}
                    className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 py-4 px-3 text-sm font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
                      formData.role === "freelancer"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 shadow-md shadow-purple-500/10"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    {formData.role === "freelancer" && (
                      <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </span>
                    )}
                    <span className="text-2xl">💼</span>
                    <span>Freelancer</span>
                    <span className="text-[10px] font-normal opacity-70 text-center">Offer skills</span>
                  </button>
                </div>
              </div>

              {/* Freelancer Profile Section */}
              {formData.role === "freelancer" && (
                <div className="flex flex-col gap-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-4">
                  {/* Section Header */}
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-purple-500" />
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                      Freelancer Profile
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="skills" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                      Skills
                      <span className="ml-1.5 normal-case font-normal text-zinc-400">(comma-separated)</span>
                    </label>
                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      placeholder="React, Node.js, Design"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:focus:border-purple-500 transition-all duration-150"
                    />
                  </div>

                  {/* Bio */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bio" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      placeholder="Tell clients about yourself..."
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:focus:border-purple-500 transition-all duration-150 resize-none"
                    />
                  </div>

                  {/* Hourly Rate */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hourlyRate" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                      Hourly Rate (USD)
                      <span className="ml-1.5 normal-case font-normal text-zinc-400">optional</span>
                    </label>
                    <input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      placeholder="50"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:focus:border-purple-500 transition-all duration-150"
                    />
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !passwordValid}
                className="mt-2 w-full h-11 rounded-md bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

        {/* Terms note */}
        <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500 px-4">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
