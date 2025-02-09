import Apiclient from "./apiClient"; // Import the reusable Axios client
import authHeader from "./authHeader";
const API_URL = "/api/realtime/seats"; // Relative path for auth-related endpoints

//fetch all the reserved seats.
const getAllReservedSeats = async (busId) => {
  try {
    const response = await Apiclient.get(
      API_URL + `/get-all-reservedseats/${busId}`,
      {
        headers: authHeader(), // Include the authorization header
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during fetching bookings:", error);
    const errorMessage =
      error.response?.data?.message || "fetching data failed. Try again.";
    throw new Error(errorMessage);
  }
};

// add to my booking
const addToBooking = async (userId, busId, isConfirmed) => {
  try {
    const response = await Apiclient.post(
      "api/realtime/booking/" + "save-to-real-timebooking",
      {
        userId,
        busId,
        isConfirmed,
      },
      {
        headers: authHeader(), // Include the authorization header
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "Registration failed. Try again.";
    throw new Error(errorMessage);
  }
};

// Confirm Booking
const confirmBooking = async (username, email, password) => {
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
const getOneBooking = async (bookingId) => {
  try {
    const response = await Apiclient.get(
      API_URL + `getOneBooking/${bookingId}`,
      {
        headers: authHeader(), // Include the authorization header
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during fetching bookings:", error);
    const errorMessage =
      error.response?.data?.message || "fetching data failed. Try again.";
    throw new Error(errorMessage);
  }
};

// get All the booking
const getAllBookings = async (userId) => {
  try {
    const response = await Apiclient.get(
      "api/realtime/booking/" + `get-all-bookings/${userId}`,
      {
        headers: authHeader(), // Include the authorization header
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during fetching bookings:", error);
    const errorMessage =
      error.response?.data?.message || "fetching data failed. Try again.";
    throw new Error(errorMessage);
  }
};

export {
  getAllReservedSeats,
  addToBooking,
  confirmBooking,
  getAllBookings,
  getOneBooking,
};
