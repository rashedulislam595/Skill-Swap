const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async <T = unknown>(api: string): Promise<T> => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}${api}`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data: T = await res.json();
  return data;
};


export const serverMutation = async <T = unknown>(
  api: string,
  newData: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST"
): Promise<T> => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}${api}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data: T = await res.json();
  return data;
};