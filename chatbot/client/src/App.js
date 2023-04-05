import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import Signup from "./components/Signup";
import Login from "./components/Signin";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Chat />} />}
      <Route path="/register" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
