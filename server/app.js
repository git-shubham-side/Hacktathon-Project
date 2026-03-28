const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
// const routes = require("./routes");
// const errorHandler = require("./middleware/errorHandler");
// const notFound = require("./middleware/notFound");

const app = express();

// ─── Security ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

//Setting Path
app.use(express.static(path.resolve("./public")));
// Set EJS as view engine
app.set("view engine", "ejs");
// Set views folder
app.set("views", path.join(__dirname, "views"));

// ─── Parsing ─────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ─────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
// app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.render("Login");
});

// ─── Error Handling ──────────────────────────────────────────────────────────
// app.use(notFound);
// app.use(errorHandler);

app.listen(3000, () => {
  console.log("server Started");
});
