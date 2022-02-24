import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Nav from "./Nav";
import "./index.css";

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
    background: {
      paper: "#4e4e4e",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  spacing: [0, 4, 8, 16, 32, 64],
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
          <Route path="/" element={<Home theme={theme} />} />
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
