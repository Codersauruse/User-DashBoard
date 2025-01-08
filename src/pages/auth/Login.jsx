import { useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import toast from "react-hot-toast";
import { login } from "../../service/apiService.js";
import useUserStore from "../../components/zustand/userStore.js";
import { useNavigate } from "react-router";

export default function Login() {
  const formInfo = {
    username: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(formInfo);
  const [isLoading, setLoading] = useState(false);
  const Login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  //testing toast
  // useEffect(() => {
  //   toast.success("Testing toast");
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let key in formDetails) {
      if (!formDetails[key].trim() && key === "username") {
        toast.error("Username is required");
        console.log("helllo");
        return;
      }
      if (
        key === "username" &&
        (formDetails[key].length < 4 || formDetails[key].length > 20)
      ) {
        toast.error("Username must be between 4 and 20 characters");
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

    setLoading(true);
    try {
      const userData = await login(
        formDetails.username,
        formDetails.email,
        formDetails.password
      );
      console.log(userData);
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃",
      });
      Login(userData);

      console.log(user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
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
            Login to your account
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
                  autoComplete="current-password"
                  value={formDetails.password}
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
                Login
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <FaGoogle className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaFacebookF className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900"
              >
                <FaGithub className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
