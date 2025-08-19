// Utility functions for secure token management
export const TokenManager = {
  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  // Set token in localStorage
  setToken: (token: string): void => {
    localStorage.setItem("auth_token", token);
  },

  // Remove token from localStorage
  removeToken: (): void => {
    localStorage.removeItem("auth_token");
  },

  // Check if token exists and is not empty
  hasToken: (): boolean => {
    const token = TokenManager.getToken();
    return token !== null && token.trim() !== "";
  },

  // Get authorization header for API requests
  getAuthHeader: (): Record<string, string> => {
    const token = TokenManager.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Validate token format (basic validation)
  isValidTokenFormat: (token: string): boolean => {
    // Basic token validation - should be a non-empty string
    // In a real app, you might want to validate JWT structure
    return typeof token === "string" && token.length > 0;
  },
};

// HTTP client with automatic token inclusion
export const apiClient = {
  get: async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...TokenManager.getAuthHeader(),
        ...options.headers,
      },
    });
  },

  post: async (url: string, data: any, options: RequestInit = {}) => {
    return fetch(url, {
      method: "POST",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...TokenManager.getAuthHeader(),
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  },

  put: async (url: string, data: any, options: RequestInit = {}) => {
    return fetch(url, {
      method: "PUT",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...TokenManager.getAuthHeader(),
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  },

  delete: async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      method: "DELETE",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...TokenManager.getAuthHeader(),
        ...options.headers,
      },
    });
  },
};
