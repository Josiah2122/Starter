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
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginImage from "../images/loginImage.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage?.setItem("userData", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Signup logic here
    console.log("Signup functionality would go here");
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#170312" }}>
      {/* Left Side - Form */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            p: 4,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ width: "100%", maxWidth: "500px", mb: 4 }}
          >
            <Tab label="Log in" value="login" />
            <Tab label="Sign up" value="signup" />
          </Tabs>

          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            {/* Express Login Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                color="white"
                textAlign="center"
                mb={2}
              >
                Express login via Google and Facebook
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                    flex: 1,
                  }}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={{
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                    flex: 1,
                  }}
                >
                  Facebook
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 4 }}>
              <Typography variant="body2" color="white">
                OR
              </Typography>
            </Divider>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    required
                    size="medium"
                    type="text"
                    placeholder="Email or username"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    size="medium"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
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

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                    fullWidth
                  >
                    Log in
                  </Button>

                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      color="inherit"
                      sx={{ color: "white", textTransform: "none" }}
                    >
                      Log in with SSO
                    </Button>
                    <Button
                      color="inherit"
                      sx={{ color: "white", textTransform: "none" }}
                    >
                      Forgot password?
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup}>
                <Stack spacing={3}>
                  <TextField
                    required
                    size="medium"
                    type="text"
                    placeholder="Email"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                  />

                  <TextField
                    required
                    size="medium"
                    type="text"
                    placeholder="Username"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                  />

                  <TextField
                    size="medium"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
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

                  <TextField
                    size="medium"
                    required
                    type="password"
                    placeholder="Confirm Password"
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                    fullWidth
                  >
                    Create Account
                  </Button>
                </Stack>
              </form>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Right Side - Image */}
      <Grid item xs={6}>
        <Box
          sx={{
            width: "98%",
            height: "98%",
            margin: "1%",
            borderRadius: "3%",
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Grid>
  );
}
