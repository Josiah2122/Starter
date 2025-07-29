import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
// import { format } from "date-fns";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  // const userData = localStorage.getItem("userData");

  const getTickets = async () => {
    try {
      // This method is for tokens that are stored in localStorage
      // const token = JSON?.parse(userData)?.token;
      // const response = await fetch("http://localhost:5000/api/tickets", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // This method is for tokens that are stored in cookies
      const response = await fetch("http://localhost:5000/api/tickets", {
        credentials: "include", // Include cookies in the request
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
        return;
      }
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "primary";
      case "In Progress":
        return "warning";
      case "Closed":
        return "success";
      default:
        return "default";
    }
  };

  // const formatDate = (dateString) => {
  //   return format(new Date(dateString), "MMM dd, yyyy - hh:mm a");
  // };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Tickets
      </Typography>

      {tickets?.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="textSecondary">
            No tickets found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tickets?.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket._id}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 600 }}
                    >
                      {ticket.title}
                    </Typography>
                    <Chip
                      label={ticket.status}
                      color={getStatusColor(ticket.status)}
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {ticket.description}
                  </Typography>

                  {/* <Typography variant="caption" color="text.secondary">
                    Created: {formatDate(ticket.createdAt)}
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
