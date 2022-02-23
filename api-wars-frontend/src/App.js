import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

// mui
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#eeef2f",
        },
        secondary: {
            main: "#262626",
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
    //let navigate = useNavigate();
    const handleSignUpOnSuccess = () => {
        //return navigate("/login");
    };
    const handleSignInOnSuccess = () => {
        console.log("done it");
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Nav />
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
        </ThemeProvider>
    );
}

export default App;
