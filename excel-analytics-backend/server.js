const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const jwt = require("jsonwebtoken");

const { connectDB } = require("./src/config/db.js");
const User = require("./src/models/User");

const authRoutes = require("./src/routes/authRoutes");
const fileRoutes = require("./src/routes/fileRoutes");
const historyRoutes = require('./src/routes/history');
const userRoutes = require('./src/routes/userRoutes'); // if used elsewhere
const adminRoutes = require('./src/routes/adminRoutes');
const insightRoutes = require('./src/routes/insightRoutes');

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Middlewares
app.use(cors({
  origin: [
    'https://ksuvii21.github.io/Excel-Analytics', 
    'https://excel-analytics-zo51.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const allowList = new Set([
  process.env.FRONTEND_URL,
  'https://ksuvii21.github.io', // keep if you need both
]);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowList.has(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Debug logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB
connectDB().catch(err => {
  console.error("Database connection failed:", err);
  process.exit(1);
});
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/insights', insightRoutes);


// Admin example
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
app.get("/api/admin/users", authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const me = await User.findById(req.user.userId);
    if (!me || (me.role !== "admin" && me.role !== "superadmin")) {
      return res.status(403).json({ message: "Access denied. Admin required." });
    }
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (e) { next(e); }
});

app.get("/api/users/:email", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/health", (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// 404 for api
app.all("/api/*", (req, res) => res.status(404).json({ message: "API endpoint not found" }));

// Error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("FRONTEND_URL exists:", !!process.env.FRONTEND_URL);
console.log("NODE_ENV exists:", !!process.env.NODE_ENV);
console.log("PORT exists:", !!process.env.PORT);
console.log("AI_INSIGHTS exists:", !!process.env.AI_INSIGHTS);
