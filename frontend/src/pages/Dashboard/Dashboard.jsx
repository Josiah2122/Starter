import React, { useEffect, useState } from "react";
import Tickets from "../Ticket/Tickets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <>
      <div>
        <button onClick={handleLogout} style={{ marginLeft: 16 }}>
          Logout
        </button>
      </div>
      <Tickets />
    </>
  );
}
