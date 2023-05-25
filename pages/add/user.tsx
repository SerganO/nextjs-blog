import getConfig from "next/config";
import { useState } from "react";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

type UserData = {
  firstName: string;
  lastName: string;
  userEmail: string;
  password: string;
  role: string;
};

function showNotification(message: string) {
  window.alert(message);
}

const AddUserForm = () => {
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("all ok");
        const responseBody = await response.json();
        console.log(responseBody);
        setUser({
          firstName: "",
          lastName: "",
          userEmail: "",
          password: "",
          role: "",
        });
        showNotification("User added successfully");
      } else {
        const responseBody = await response.text();
        showNotification("error:" + responseBody);
      }
    } catch (error) {
      console.error(error);
      showNotification("error:" + error);
    }
  };

  return (
    <div>
      <form className="mx-auto mt-8 max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="mb-2 block font-bold text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="mb-2 block font-bold text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="mb-2 block font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={user.userEmail}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block font-bold text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={user.role}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
