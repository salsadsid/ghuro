// Authentication API service using reqres.in
const API_BASE_URL = "https://reqres.in/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export interface ApiError {
  error: string;
}

// Login API call
export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // reqres.in only returns token for login, so we'll fetch user details separately
    if (data.token) {
      try {
        const userResponse = await fetch(`${API_BASE_URL}/users/2`); // Using user ID 2 as example
        const userData = await userResponse.json();

        return {
          token: data.token,
          user: userData.data,
        };
      } catch (error) {
        // If user fetch fails, still return the token with a default user
        return {
          token: data.token,
          user: {
            id: 2,
            email: credentials.email,
            first_name: "Test",
            last_name: "User",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
          },
        };
      }
    }

    throw new Error("No token received");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error occurred");
  }
};

// Register API call
export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse> => {
  try {
    // reqres.in only allows registration for predefined users
    // Use eve.holt@reqres.in as the email for successful registration
    const registrationData = {
      email: "eve.holt@reqres.in", // Force use of valid reqres.in email
      password: userData.password,
    };

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Registration failed. Please use eve.holt@reqres.in as email for demo."
      );
    }

    if (data.token) {
      // Create user with the original data provided by user but successful registration
      const mockUser = {
        id: data.id || Date.now(),
        email: userData.email, // Use the original email from user input
        first_name: userData.name?.split(" ")[0] || "User",
        last_name: userData.name?.split(" ")[1] || "",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      };

      return {
        token: data.token,
        user: mockUser,
      };
    }

    throw new Error("Registration failed");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error occurred");
  }
};

// Fetch user details (optional, for when we have token but need user info)
export const getUserDetails = async (userId: number): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return data.data;
};
