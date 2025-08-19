import React, { useEffect, useState } from "react";
import Tickets from "../Ticket/Tickets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to fetch User Data:", error.message);
    }
  };

  console.log(user, "user");

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
        Dashboard
        <button onClick={handleLogout} style={{ marginLeft: 16 }}>
          Logout
        </button>
      </div>
      <Tickets />
    </>
  );
}
