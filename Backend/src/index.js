import express from "express";
import Authrouter from "./routes/auth.route.js";
import Messagerouter from "./routes/message.route.js";
import dotenv from "dotenv";
import { connect_db } from "./lib/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app, io } from "./lib/socket.js";
import path from "path";

dotenv.config();

const default_port = "http://localhost:3000";

app.use(express.json({ limit: "10mb" }));

const Port = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "https://we-chat-frontend.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use("/api/auth", Authrouter);
app.use("/api/message", Messagerouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend", "dist", "index.html"));
  });
}
server.listen(Port, () => {
  console.log(`listening on the port ${Port}`);
  connect_db();
});
