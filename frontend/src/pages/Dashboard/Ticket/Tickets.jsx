import React, { useEffect } from "react";

export default function Tickets() {
  const userData = localStorage.getItem("userData");

  const getTickets = async () => {
    try {
      const token = JSON?.parse(userData)?.token;
      const response = await fetch("http://localhost:5000/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);
  return <div>tickets</div>;
}
