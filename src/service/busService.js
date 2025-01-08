import Apiclient from "./apiClient"; // Import the reusable Axios client
import authHeader from "./authHeader";
const API_URL = "api/bus/";

const getAllBuses = async (destination) => {
  try {
    const response = await Apiclient.get(API_URL + "/get-all-buses", {
      headers: authHeader(), // Include the authorization header
      params: { destination }, // Pass destination as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "fetching busses  failed. Try again.";
    throw new Error(errorMessage);
  }
};


const getBus = async (busId) => {
  try {
    const response = await Apiclient.get(API_URL + `getBus/${busId}`, {
      headers: authHeader(), // Include the authorization header
    });
    return response.data;
    
   } catch (error) {
    console.error("Error during fetching bookings:", error);
    const errorMessage =
      error.response?.data?.message || "fetching data failed. Try again.";
    throw new Error(errorMessage);
   }


 };

export { getAllBuses ,getBus};
