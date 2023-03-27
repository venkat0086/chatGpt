import "./App.css";
import Chat from "./Chat";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route
          exact
          path="/"
          element={user ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes> */}
      <Chat />
    </div>
  );
}

export default App;
