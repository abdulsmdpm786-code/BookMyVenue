import express from "express";
import {
  deleteMessage,
  getMessage,
  handlePost,
} from "../../Controllers/messageControllers.js";

const adminMessageRoutes = express.Router();

adminMessageRoutes.post("/post", handlePost);
adminMessageRoutes.get("/:id/get", getMessage);
adminMessageRoutes.delete("/:id/get", deleteMessage);
export default adminMessageRoutes;
