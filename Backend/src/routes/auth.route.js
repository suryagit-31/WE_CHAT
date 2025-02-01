import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  check_Auth
} from "../controllers/auth.controller.js";
import { protected_Route } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);
 
router.post("/logout", logout);
 
router.put("/update-profile", protected_Route, updateProfile);

router.get("/check", protected_Route, check_Auth);

export default router;
