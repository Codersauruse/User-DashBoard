import { useState } from "react";
import Logo from "../../assets/logo.jpg";
import toast from "react-hot-toast";
import { register } from "../../service/apiService.js";
import { useNavigate } from "react-router";

export default function Register() {
  const formInfo = {
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  };

  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(formInfo);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let key in formDetails) {
      if (!formDetails[key].trim() && key === "username") {
        toast.error("Username is required");
        return;
      }
      if (
        key === "username" &&
        (formDetails[key].length < 4 || formDetails[key].length > 20)
      ) {
        toast.error("Username must be between 4 and 20 characters");
        return;
      }
      if (!formDetails[key].trim() && key === "email") {
        toast.error("Email is required");
        return;
      }
      if (!formDetails[key].trim() && key === "password") {
        toast.error("Password is required");
        return;
      }
      if (
        key === "password" &&
        (formDetails[key].length < 4 || formDetails[key].length > 10)
      ) {
        toast.error("Password must be between 4 and 10 characters");
        return;
      }
    }

    if (formDetails.password !== formDetails.retypePassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await register(
        formDetails.username,
        formDetails.email,
        formDetails.password
      );
      toast.success("Registration successful!", {
        duration: 3000,
        icon: "🎉",
      });
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Astra Ride" src={Logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formDetails.username}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formDetails.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formDetails.password}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="retypePassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Retype Password
              </label>
              <div className="mt-2">
                <input
                  id="retypePassword"
                  name="retypePassword"
                  type="password"
                  autoComplete="new-password"
                  value={formDetails.retypePassword}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
