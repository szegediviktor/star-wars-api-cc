import { useState } from "react";

// MUI

import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

const signin = (userName, password) => {
    return fetch("/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Wrong credentials");
    });
};

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [helperText, setHelperText] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = (userName, password) => {
        setError(null);
        setLoading(true);
        signin(userName, password)
            .then(() => {
                props.onSuccess();
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setUserName("");
                setPassword("");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName || password) {
            return handleSignIn(userName, password);
        }
        if (!userName || !password) {
            setHelperText("Please, fill in both fields.");
        }
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <FormControl variant="filled">
                <InputLabel htmlFor="component-filled">Username</InputLabel>
                <FilledInput
                    id="component-filled"
                    type="text"
                    className="input"
                    value={userName}
                    onChange={handleUserNameChange}
                    disabled={loading}
                />
            </FormControl>
            <FormControl variant="filled">
                <InputLabel htmlFor="component-filled2">Password</InputLabel>
                <FilledInput
                    id="component-filled2"
                    type="password"
                    className="input"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                />
            </FormControl>
            <FormHelperText>{helperText}</FormHelperText>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit-btn"
                disabled={loading}
            >
                Login
            </Button>
        </Box>
    );
};

export default Login;
