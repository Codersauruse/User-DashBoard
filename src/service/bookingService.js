import Apiclient from "./apiClient"; // Import the reusable Axios client
import authHeader from "./authHeader";
const API_URL = "api/booking/"; // Relative path for auth-related endpoints

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
const confirmBooking = async (
  userId,
  busId,
  bookingId,
  numberOfSeats,
  selectedSeats,
  date
) => {
  try {
    const seats = JSON.stringify(selectedSeats);
    const response = await Apiclient.post(
      API_URL + "confirmBooking",
      {
        userId,
        busId,
        bookingId,
        numberOfSeats,
        seats,
        date,
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

export { addToBooking, confirmBooking, getAllBookings, getOneBooking };
