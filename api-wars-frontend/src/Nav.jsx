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
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <Link to="/">Home</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/register">Registration</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="login">Login</Link>
                    </Button>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Show username if logined
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Nav;
