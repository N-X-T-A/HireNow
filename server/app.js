require("dotenv").config(); // Load environment variables from .env
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index.routes");

var app = express();

// Configure CORS using environment variable
const corsOptions = {
  origin: process.env.CLIENT || "*", // Allow requests from the specified origin or all origins by default
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
  credentials: true, // Enable cookies and authentication headers if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(logger("dev")); // Logging middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

app.use("/", indexRouter); // Main route handler

// Middleware to handle 404 errors (Resource not found)
app.use(function (req, res, next) {
  next(createError(404));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: req.app.get("env") === "development" ? err : {}, // Show error details in development only
  });
});

// Security headers to prevent cross-origin security issues
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

module.exports = app;
