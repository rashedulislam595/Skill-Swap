const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// ─── Fetch Options ────────────────────────────────────────────────────────────

interface FetchOptions {
  /** Better Auth session token — adds `Authorization: Bearer <token>` header */
  token?: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildHeaders(options?: FetchOptions, extra?: Record<string, string>): Record<string, string> {
  const hdrs: Record<string, string> = { ...extra };
  if (options?.token) {
    hdrs["Authorization"] = `Bearer ${options.token}`;
  }
  return hdrs;
}

// ─── Public Server Fetch (no auth) ────────────────────────────────────────────

export const serverFetch = async <T = unknown>(api: string): Promise<T> => {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const res = await fetch(`${baseUrl}${api}`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
};

// ─── Authenticated Server Fetch ───────────────────────────────────────────────

/**
 * Same as serverFetch but attaches a Bearer token.
 * Use for routes that require authentication on the Express backend.
 */
export const authFetch = async <T = unknown>(api: string, options: FetchOptions): Promise<T> => {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const res = await fetch(`${baseUrl}${api}`, {
    headers: buildHeaders(options),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
};

// ─── Public Server Mutation (no auth) ────────────────────────────────────────

export const serverMutation = async <T = unknown>(
  api: string,
  newData: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST"
): Promise<T> => {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const res = await fetch(`${baseUrl}${api}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
};

// ─── Authenticated Server Mutation ────────────────────────────────────────────

/**
 * Same as serverMutation but attaches a Bearer token.
 * Use for POST/PUT/DELETE routes that require authentication on the Express backend.
 */
export const authMutation = async <T = unknown>(
  api: string,
  newData: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  options: FetchOptions = {}
): Promise<T> => {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const res = await fetch(`${baseUrl}${api}`, {
    method,
    headers: buildHeaders(options, { "Content-Type": "application/json" }),
    body: JSON.stringify(newData),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
};