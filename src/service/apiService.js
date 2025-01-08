import Apiclient from "./apiClient"; // Import the reusable Axios client

const API_URL = "api/user/"; // Relative path for auth-related endpoints

// Register a new user
const register = async (username, email, password) => {
  try {
    const response = await Apiclient.post(API_URL + "register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "Registration failed. Try again.";
    throw new Error(errorMessage);
  }
};

// Log in a user
const login = async (username, email, password) => {
  try {
    const response = await Apiclient.post(API_URL + "login", {
      username,
      email,
      password,
    });

    if (response.data.token) {
      // Store user data (including token) in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data; // Return the server response
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred during login. try again";
    throw new Error(errorMessage);
  }
};

// Log out a user
const logout = async () => {
  try {
    localStorage.removeItem("user"); // Remove user data from localStorage
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export { register, login, logout };
