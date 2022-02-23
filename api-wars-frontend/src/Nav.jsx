// React imports
import { Link } from "react-router-dom";
// MUI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Nav = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Box m={2} pt={1}>
                        <Button variant="contained">
                            <Link to="/">
                                <Typography
                                    variant="button"
                                    component="div"
                                    color="secondary"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Home
                                </Typography>
                            </Link>
                        </Button>
                    </Box>
                    <Box m={2} pt={1}>
                        <Button variant="contained" color="primary">
                            <Link to="/register">
                                <Typography
                                    variant="button"
                                    component="div"
                                    color="secondary"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Registration
                                </Typography>
                            </Link>
                        </Button>
                    </Box>
                    <Box m={2} pt={1}>
                        <Button variant="contained" color="primary">
                            <Link to="login">
                                <Typography
                                    variant="button"
                                    component="div"
                                    color="secondary"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Login
                                </Typography>
                            </Link>
                        </Button>
                    </Box>
                    <Box m={2} pt={1}>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Show username if logined
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Nav;
