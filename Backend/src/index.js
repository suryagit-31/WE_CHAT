import express from "express";
import Authrouter from "./routes/auth.route.js";
import Messagerouter from "./routes/message.route.js";
import dotenv from "dotenv";
import connect_db from "./lib/connect.js";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import {server,app,io} from "./lib/socket.js"; 

dotenv.config();



const default_port = "http://localhost:3000";

app.use(express.json({ limit: "10mb" }));

const Port = process.env.Port;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: default_port,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", Authrouter);
app.use("/api/message", Messagerouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(Port, () => {
  console.log(`listening on port ${Port} http://localhost:4000`);
  connect_db();
});
