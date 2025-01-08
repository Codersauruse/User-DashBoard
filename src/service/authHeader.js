export default function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if the user object and token are retrieved correctly

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Failed to retrieve auth header:", error);
    return {};
  }
}
