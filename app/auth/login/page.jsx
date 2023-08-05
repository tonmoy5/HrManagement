"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status, update } = useSession();
  console.log("🚀 ~ file: page.jsx:13 ~ Login ~ status:", status);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    if (status === "authenticated" && status !== "loading") {
      const nextAuthToken = getCookie("next-auth.session-token");
      if (nextAuthToken) {
        router.push("/");
      }
    }
  }, [status, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      console.log("🚀 ~ file: page.jsx:22 ~ handleSubmit ~ res:", res);

      if (!res.error) {
        router.push("/");
      } else {
        setError("Username or password is not valid.");
      }
    } catch (error) {
      // Handle any other errors that might occur during login
      console.error("Error during login:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f6fa] ">
      <div className="bg-white/20 backdrop-blur-lg shadow-md rounded px-8 pt-10 pb-10 w-96 relative overflow-hidden">
        <div className="w-96 bg_blue_gradient h-1 absolute top-0 left-0"></div>
        <div className="flex items-center gap-2 justify-center mb-6">
          <img src="/logo.svg" alt="logo" className="w-8" />
          <h2 className="text-2xl font-bold blue_gradient w-max">HRM</h2>
        </div>
        <h4 className="text-lg mb-6 text-center">Hello! Welcome back</h4>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm mb-2">
              Email or Username
            </label>
            <div className="relative flex items-center ">
              <FaEnvelope className="absolute text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                required
                className="w-full border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 pl-10 "
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="*********"
                className="w-full border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 pl-10 "
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg_blue_gradient text-white hover:bg-opacity-60 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
