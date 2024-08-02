import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorEmail, setErrEmail] = React.useState({
    message: "",
    error: false,
  });

  const [errorPassword, setErrPassword] = React.useState({
    message: "",
    error: false,
  });
  
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Box>
        <Typography component="h1" variant="h5" color="inherit">
          Login
        </Typography>
        <form onSubmit={handleLogin} noValidate>
          <InputLabel htmlFor="email">Email Id</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="Email Address"
            value={values.email}
            helperText={errorEmail.message}
            error={errorEmail.error}
            style={{ marginBottom: "15px", color: "#565657" }}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <TextField
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            fullWidth
            placeholder="Password"
            // label="Password"
            variant="outlined"
            required
            helperText={errorPassword.message}
            error={errorPassword.error}
            style={{ marginBottom: "15px", color: "#F8F8F8" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            labelWidth={70}
          />
          <Link
            href="#/forgot-password"
            variant="body2"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#6C3DFF" }}
          >
            {loading && <CircularProgress size={20} color="inherit" />} LOGIN
          </Button>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
            }}
            color="inherit"
          >
            New here?{" "}
            <Link
              href="#/create-account"
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Box>
    </Grid>
  );
};

export default Login;
