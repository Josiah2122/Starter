import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // const authHeader = req.header("Authorization");
  // if (!authHeader) return res.status(401).json({ message: "Access denied" });

  // Extract the token from the "Bearer <token>" format
  // const token = authHeader.split(" ")[1];

  const token = req.cookies.token; // For cookies, use req.cookies.token
  if (!token) {
    // Fallback to Authorization header if needed
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const headerToken = authHeader.split(" ")[1];
      if (headerToken) {
        token = headerToken;
      }
    }
  }
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No Token Provided!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
