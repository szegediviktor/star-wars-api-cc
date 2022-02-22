import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

function App() {
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
        <Route path="/register" element={<div>Registration</div>} />
        <Route path="/login" element={<div>Login</div>} />
      </Routes>
    </div>
  );
}

export default App;
