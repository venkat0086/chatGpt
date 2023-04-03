import { Link } from "react-router-dom";
// import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex">
            <Link to="/" className="text-white font-bold text-xl">
              Chatbot
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Main;
