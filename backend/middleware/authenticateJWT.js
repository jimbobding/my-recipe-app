const jwt = require("jsonwebtoken");
require("dotenv").config();

const JwtTokenKey = process.env.JWT_SECRET;
console.log("JWT Token Key:", JwtTokenKey);

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader); // Debugging log

  if (!authHeader) {
    console.error("No Authorization header provided.");
    return res.status(403).json({ message: "No token provided." });
  }

  // Split the authorization header to get the token
  const token = authHeader.split(" ")[1];

  console.log("Extracted Token:", token); // Debugging log

  if (!token) {
    console.error("No token found in Authorization header.");
    return res.status(403).json({ message: "Token is missing." });
  }

  // Verify the token
  jwt.verify(token, JwtTokenKey, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    console.log("Decoded User from Token:", user); // Log the decoded user info

    req.user = user; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
