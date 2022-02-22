import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

function App() {
  //let navigate = useNavigate();
  const handleSignUpOnSuccess = () => {
    //return navigate("/login");
  };
  const handleSignInOnSuccess = () => {
    console.log("done it");
  };

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Registration</Link>
        <Link to="login">Login</Link>
        Show username if logined
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register onSuccess={handleSignUpOnSuccess} />}
        />
        <Route
          path="/login"
          element={<Login onSuccess={handleSignInOnSuccess} />}
        />
      </Routes>
    </div>
  );
}

export default App;
