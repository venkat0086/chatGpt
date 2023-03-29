import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
// import { login } from "../Redux/Login/action";.
import {
  registerFailure,
  registerLoading,
  registerSuccess,
} from "../Redux/Register/action";
import AlertPop from "./AlertPop";
import Spinner from "./Spinner";
export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated, loading } = useSelector((state) => state.login);

  const [popup, setPopup] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerDetails = {
      username,
      password,
      name,
      email,
      mobile,
      description,
    };

    dispatch(registerLoading());
    fetch(`http://localhost:8080/register`, {
      method: "POST",
      body: JSON.stringify(registerDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          //   alert(res.message);
          setPopup(true);
          setPopUpContent(res.message);
          setTimeout(() => {
            setPopup(false);
          }, 3000);
        } else {
          dispatch(registerSuccess(res));
          navigate("/login");
        }
      })
      .catch((err) => {
        dispatch(registerFailure());
        alert("Registrattion Failed");
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    // <div className="login-form">
    //   <label>Name: </label>
    //   <input
    //     type="text"
    //     placeholder="Enter Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Email: </label>{" "}
    //   <input
    //     type="text"
    //     placeholder="Enter Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Username: </label>{" "}
    //   <input
    //     type="text"
    //     placeholder="Enter Username"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Password: </label>
    //   <input
    //     type="password"
    //     placeholder="Enter Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Mobile Number: </label>
    //   <input
    //     type="text"
    //     placeholder="Enter Mobile Number"
    //     value={mobile}
    //     onChange={(e) => setMobile(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Description: </label>
    //   <input
    //     type="text"
    //     placeholder="Enter Description"
    //     value={description}
    //     onChange={(e) => setDescription(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <button onClick={handleSubmit}>Register</button>
    // </div>
    <div>
      {popup && <AlertPop content={popUpContent} variant severity="info" />}
      {loading && <Spinner />}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-lg font-medium mb-6">Welcome To Chatbot-GPT</h2>
          <div className="flex gap-6 justify-between">
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Mobile Number"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-6">
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Description"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Register
          </button>
          <div className="flex justify-center items-center mt-6">
            <span className="text-sm text-gray-600 mr-2">
              Already have an account?
            </span>
            <a
              href="/login"
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
