import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

type FetchOptions = {
  cache?: RequestCache;
  headers?: Record<string, string>;
  tags?: string[];
};

// Helper internal untuk menangani request
async function fetchClient(endpoint: string, options: RequestInit = {}) {
  // Ambil Token dari Cookies (Async di Next.js 15)
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // Setup Headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Auto-attach Token jika ada
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    // Jika API Anda butuh cookie juga (untuk middleware):
    headers["Cookie"] = `admin_token=${token}`; 
  }

  // Default no-store agar data admin selalu fresh (Real-time)
  const cacheOption = options.cache || "no-store";

  // Eksekusi Fetch
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: cacheOption,
  });

  // Handle Response
  // Jika response tidak OK, throw error agar bisa di-catch di page
  if (!response.ok) {
    // Coba baca error message dari body jika ada
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed: ${response.status}`);
  }

  // Parse JSON
  return response.json();
}

// Export method wrapper agar mirip Axios
export const serverApiClient = {
  get: async <T>(endpoint: string, options?: FetchOptions) => {
    return fetchClient(endpoint, {
      method: "GET",
      cache: options?.cache,
      headers: options?.headers,
      next: { tags: options?.tags },
    }) as Promise<T>;
  },

  post: async <T>(endpoint: string, body: any, options?: FetchOptions) => {
    return fetchClient(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      cache: options?.cache,
      headers: options?.headers,
    }) as Promise<T>;
  },

  put: async <T>(endpoint: string, body: any, options?: FetchOptions) => {
    return fetchClient(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      cache: options?.cache,
      headers: options?.headers,
    }) as Promise<T>;
  },

  delete: async <T>(endpoint: string, options?: FetchOptions) => {
    return fetchClient(endpoint, {
      method: "DELETE",
      cache: options?.cache,
      headers: options?.headers,
    }) as Promise<T>;
  },
};