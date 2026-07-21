import express from "express";
import {
  deleteMessage,
  editMessage,
  getMessage,
  handlePost,
} from "../../Controllers/messageControllers.js";

const messageRoutes = express.Router();

messageRoutes.post("/post", handlePost);
messageRoutes.get("/:id/get", getMessage);
messageRoutes.delete("/:id/get", deleteMessage);
messageRoutes.put("/:id/edit", editMessage);
export default messageRoutes;
