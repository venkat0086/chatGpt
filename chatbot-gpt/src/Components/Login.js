import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/Login/action";
import AlertPop from "./AlertPop";
// import Spinner from "./Spinner";
// import { NavBar } from "./NavBar";
// import "../Styles/Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username,
      password,
    };
    if (username === "" || password === "") {
      setPopup(true);
      setPopUpContent("Please fill all details");
      setTimeout(() => {
        setPopup(false);
      }, 3000);
    } else {
      dispatch(login(payload));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // useEffect(() => {
  //   const userDetails = localStorage.getItem('userDetails');

  //   if (userDetails) {
  //     dispatch({ type: USER_LOGIN_SUCCESS, payload: JSON.parse(userDetails) });
  //   }
  // }, [dispatch]);

  return (
    <div>
      {popup && <AlertPop content={popUpContent} severity="info" />}
      {/* {loading && <Spinner />} */}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-lg font-medium mb-6">Welcome To Chatbot-GPT</h2>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <div className="flex justify-center items-center mt-6">
            <span className="text-sm text-gray-600 mr-2">
              Don't have an account?
            </span>
            <a
              href="/register"
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
