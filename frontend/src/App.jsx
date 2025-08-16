import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c5d99", // color for buttons
      light: "#757de8",
      dark: "#170312", // color for buttons when hovered
      contrastText: "#fff",
    },
    secondary: {
      main: "#435988ff",
      light: "#1C5D99",
      dark: "#11c535ff",
      contrastText: "#fff",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={"Bounce"}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
