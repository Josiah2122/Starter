import express from "express";
import Ticket from "../models/Ticket.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a ticket (User Only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTicket = new Ticket({
      user: req.user.id,
      title,
      description,
      status: "Open",
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get tickets
router.get("/", authMiddleware, async (req, res) => {
  try {
    let tickets;
    if (req.user.role === "Admin") {
      tickets = await Ticket.find(); // Admin sees all tickets
    } else {
      tickets = await Ticket.find({ user: req.user.id }); // User sees only their tickets
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update ticket status (Admin Only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
