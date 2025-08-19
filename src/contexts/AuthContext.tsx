import * as authApi from "@/api/auth";
import type { User } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Security: Store token in localStorage and user data separately
  const getStoredToken = () => {
    return localStorage.getItem("auth_token");
  };

  const storeAuthData = (token: string, userData: User) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearAuthData = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Check for existing authentication on app load
    const storedToken = getStoredToken();
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If user data is corrupted, clear everything
        clearAuthData();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ email, password });

      // Convert API user format to our User type
      const userData: User = {
        id: response.user?.id?.toString() || "1",
        name: response.user
          ? `${response.user.first_name} ${response.user.last_name}`.trim()
          : "User",
        email: response.user?.email || email,
        avatar:
          response.user?.avatar || "https://reqres.in/img/faces/1-image.jpg",
      };

      storeAuthData(response.token, userData);
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.register({ email, password, name });

      // Convert API user format to our User type
      const userData: User = {
        id: response.user?.id?.toString() || Date.now().toString(),
        name: response.user
          ? `${response.user.first_name} ${response.user.last_name}`.trim()
          : name,
        email: response.user?.email || email,
        avatar:
          response.user?.avatar || "https://reqres.in/img/faces/1-image.jpg",
      };

      storeAuthData(response.token, userData);
      setUser(userData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
