const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint);
  },

  post<T>(endpoint: string, body: any): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: any): Promise<T> {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
};
