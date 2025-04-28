import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginImage from "../images/loginImage.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(Object(response.data));
      localStorage?.setItem("userData", JSON.stringify(response.data)); // Store user data in localStorage
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
      // toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh" }}
      // bgcolor={"primary.dark"}
    >
      <Grid size={6}>
        <Box
          sx={{
            width: "98%",
            height: "98%",
            margin: "1%",
            borderRadius: "3%",
          }}
          bgcolor={"primary.main"}
        />
        {/* <img
            src={loginImage}
            alt="loginImage"
            style={{
              borderRadius: "3%",
              // height: "100vh",
            }}
          />
        </Box> */}
      </Grid>
      <Grid size={6}>
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{
              width: "98%",
              height: "98%",
              margin: "1%",
              borderRadius: "3%",
            }}
          >
            <Typography variant="h3">Welcome Back</Typography>
            <TextField
              required
              // size="small"
              type="text"
              placeholder="Email or Username"
              variant="outlined"
              color="primary.light"
              sx={{ width: "70%", color: "#ffffff" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              type={showPassword ? "text" : "password"} // Toggle between text/password
              placeholder="Password"
              variant="outlined"
              sx={{ width: "70%", color: "#ffffff" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      // sx={{ color: "#ffffff" }} // Optional: Style the icon color
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={1}>
              <Typography variant="h6">New Here? </Typography>
              <Typography variant="h6" color={"secondary.light"}>
                Create an account
              </Typography>
            </Stack>

            <Button
              // onClick={handleLogin}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              sx={{ width: "70%", color: "#ffffff" }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
