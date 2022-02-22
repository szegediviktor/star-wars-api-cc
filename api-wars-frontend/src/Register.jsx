import { useState } from "react";

// MUI

import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const signup = (userName, password) => {
    let status = true;

    return fetch("/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
    })
        .then((res) => {
            if (!res.ok) {
                status = false;
            }
            return res;
        })
        .then((res) => {
            return res.json();
        })
        .then((info) => {
            if (status) {
                return info;
            }
            throw info;
        });
};

const Register = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = (userName, password) => {
        setError(null);
        setLoading(true);
        signup(userName, password)
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
            return handleSignUp(userName, password);
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
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit-btn"
                disabled={loading}
            >
                Register
            </Button>
        </Box>
    );
};

export default Register;
