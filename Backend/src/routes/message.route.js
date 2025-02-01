import express from "express";
import { protected_Route } from "../middleware/auth.middleware.js";

import {
  getusers_Sidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const m_router = express.Router();


m_router.get("/users", protected_Route, getusers_Sidebar);
m_router.get("/:id", protected_Route, getMessages);
m_router.post("/send/:id", protected_Route, sendMessage);

export default m_router;
