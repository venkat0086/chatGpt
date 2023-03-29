import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Chat from "./Components/Chat";
import { Login } from "./Components/Login";
// import { Events } from "./Components/Events";

import "./App.css";
import { Register } from "./Components/Register";
import { useEffect, useState } from "react";
import Spinner from "./Components/Spinner";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App">
      {loading && <Spinner />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/event"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Events />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
