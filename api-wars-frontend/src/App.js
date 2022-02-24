import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

// mui
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#eeef2f",
    },
    secondary: {
      main: "#262626",
    },
    warning: {
      main: "#e6e6db",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const [user, setUser] = useState("");

  const handleSignUpOnSuccess = () => {
    console.log("sikeres regisztráció");
  };
  const handleSignInOnSuccess = () => {
    console.log("done it");
  };

  const addUser = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser();
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Nav user={user} logOut={logOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register onSuccess={handleSignUpOnSuccess} />}
          />
          <Route
            path="/login"
            element={
              <Login onSuccess={handleSignInOnSuccess} addUser={addUser} />
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
