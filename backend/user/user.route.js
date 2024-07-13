import express from "express";
export const User_router = express.Router();
import { userController } from "./user.controller.js";
import { auth } from "../middleware/jwt_auth.js";
import { admin } from "../middleware/admin_auth.js";

User_router.post("/register", userController.register);
User_router.post("/login", userController.login);
User_router.get("/", userController.getAllUsers);
User_router.post("/make-admin/:id", userController.makeAdmin);
User_router.put("/:id", userController.updateUser);
User_router.delete("/:id", userController.deleteUser);
