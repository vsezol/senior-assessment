const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const killPort = require("kill-port");
const path = require("path");
const itemsRouter = require("./routes/items");
const statsRouter = require("./routes/stats");
const { initRuntimeConfig } = require("./config/runtimeConfig");
require("dotenv").config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 4001;
const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;

app.use(
  cors({
    origin: [`http://localhost:${FRONTEND_PORT}`, `http://localhost:3000`],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/items", itemsRouter);
app.use("/api/stats", statsRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const startServer = async (port) => {
  try {
    initRuntimeConfig();

    const server = app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });

    const shutdownHandler = (signal) => {
      console.log(`\nCaught ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log("Server closed. Port released.");
        process.exit(0);
      });

      setTimeout(() => {
        console.error("Force exiting after timeout");
        process.exit(1);
      }, 5000);
    };

    process.on("SIGINT", () => shutdownHandler("SIGINT"));
    process.on("SIGTERM", () => shutdownHandler("SIGTERM"));
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      shutdownHandler("uncaughtException");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

killPort(PORT, "tcp")
  .then(() => {
    console.log(`Port ${PORT} killed. Starting fresh server...`);
    startServer(PORT);
  })
  .catch((err) => {
    console.warn(
      `Port ${PORT} may not have been in use. Starting server anyway...`
    );
    startServer(PORT);
  });
