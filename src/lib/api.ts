export const API_URL =
  import.meta.env.VITE_API_URL || "https://tranquil-heart-1f2994ed04.strapiapp.com";

export const API_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export const fetchAPI = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
        ...options.headers,
      },
      body: options.body,
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
