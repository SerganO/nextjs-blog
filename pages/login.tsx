import { useState } from "react";
import getConfig from "next/config";
import SiteHeader from "components/siteHeader";
import { useRouter } from "next/router";
import { showMessageNotification } from "src/functions/showNotification";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const goAfterLogin = () => {
    
   //router.push("/")
}

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("start login")
    e.preventDefault();
    try {
      console.log("start try")
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      console.log("response build")
      if (response.ok) {
        console.log("response.ok")
        console.log("all ok");
        const responseBody = await response.json();
        console.log("responseBody: ", responseBody);
        setEmail("");
        setPassword("");
        goAfterLogin();
      } else {
        const responseBody = await response.text();
        showMessageNotification("error:" + responseBody);
      }
    } catch (error) {
      //console.error(error);
      showMessageNotification("error:" + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader></SiteHeader>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md rounded bg-white p-4 shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-1 block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
