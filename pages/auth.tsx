// src/components/AuthForm.tsx
import SiteHeader from "components/siteHeader";
import React, { useState } from "react";
import { useActions } from "src/hooks/useEntity";

const AuthForm = () => {
  const { login, register } = useActions("UserEntity");
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
    role: "client",
  });

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async () => {
    try {
      // Simulate a registration API call (replace with actual API call)
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // You can also redirect the user to a login page or display a success message.
      } else {
        console.error("Registration failed");
        // Handle registration failure, e.g., display an error message.
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("formData: ", formData);
    if (isRegister) {
      register({payload: formData});
    } else {
      login({payload:{ email: formData.userEmail, password: formData.password }});
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader />
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl">{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 w-full rounded-md border p-2"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 w-full rounded-md border p-2"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="userEmail" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                className="mt-1 w-full rounded-md border p-2"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full rounded-md border p-2"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isRegister}
                  onChange={toggleForm}
                />
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </label>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
