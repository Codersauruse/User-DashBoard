import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const userDetailsString = localStorage.getItem("user");

  if (userDetailsString) {
    try {
      // Parse the string from localStorage into a JavaScript object
      const userDetails = JSON.parse(userDetailsString);

      // Check if userDetails and userDetails.roles exist and if roles is an array
      if (
        userDetails &&
        userDetails.roles &&
        Array.isArray(userDetails.roles)
      ) {
        if (userDetails.roles.includes("user")) {
          console.log("hello i'm a user");
          return <>{children}</>; // Correctly return the children
        }
      }
    } catch (error) {
      console.error("Error parsing user details from localStorage:", error);
      // Handle parsing error (e.g., clear invalid data)
      localStorage.removeItem("user");
    }
  }

  // If conditions are not met, navigate to login
  navigate("/auth/login");
  return null; // Return null when navigating to prevent further rendering
};

const AdminLayout = ({ children }) => {
  let navigate = useNavigate();
  const userDetailsString = localStorage.getItem("user");

  if (userDetailsString) {
    try {
      const userDetails = JSON.parse(userDetailsString);
      if (userDetails.roles) {
        const userRoles = userDetails.roles;
        if (userRoles.includes("admin")) {
          return <>{children}</>;
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
      return null;
    }
  }

  navigate("/login");
  return null;
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node and is required
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node and is required
};

export { UserLayout, AdminLayout };
