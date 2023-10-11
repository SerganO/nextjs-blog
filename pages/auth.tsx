// src/components/AuthForm.tsx
import SiteHeader from "components/siteHeader";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useActions } from "src/hooks/useEntity";
import { action, ADD } from "store/actionTypes";

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (data) => dispatch(action(ADD, { payload: data })),
  };
};

const mapStateToProps = (state) => {
  let user = null;
  if (state.valueReducer) {
    user = state.valueReducer["LOGGED_USER"];
  }

  if (user != undefined && user != null) {
    let userData = {};
    if (typeof state.users == `undefined`) {
      userData["firstName"] = "User";
      userData["lastName"] = "";
    } else {
      userData = state.users[user];
    }

    return {
      data: {
        isLoggedIn: true,
        user: userData,
      },
    };
  } else {
    return {
      data: {
        isLoggedIn: false,
        user: {},
      },
    };
  }
};

const AuthForm = ({ data }) => {
  const { login, register, logout } = useActions("UserEntity");
  const [isRegister, setIsRegister] = useState(false);
  const isLoggedIn = data.isLoggedIn;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("formData: ", formData);
    if (isRegister) {
      register({ payload: formData as IUserPostData });
    } else {
      login({
        payload: { email: formData.userEmail, password: formData.password },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader />
      <div className="flex h-screen items-center justify-center">
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {data.user.firstName} {data.user.lastName}!</h2>
            <button
              onClick={handleLogout}
              className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl">
              {isRegister ? "Register" : "Login"}
            </h2>
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
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="mt-1 w-full rounded-md border p-2"
                      required
                      onChange={handleInputChange}
                      value={formData.role}
                    >
                      <option value="client">Client</option>
                      <option value="vendor">Vendor</option>
                    </select>
                  </div>
                </>
              )}
              <div className="mb-4">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium"
                >
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
        )}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (state) => state
)(AuthForm);
