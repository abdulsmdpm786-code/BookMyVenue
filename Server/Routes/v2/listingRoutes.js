import express from "express";
import {
  getAll,
  getOne,
  handleDelete,
  handleEdit,
  handleRegister,
  verifyVenue,
} from "../../Controllers/listControllers.js";
import upload from "../../Middlewares/multer.js";

const listingRoutes = express.Router();

listingRoutes.get("/getAll", getAll);
listingRoutes.get("/getOne/:id", getOne)
listingRoutes.post("/register", upload.single("image"), handleRegister);
listingRoutes.delete("/delete/:venueId", handleDelete);
listingRoutes.put("/edit/:venueId", upload.single("image"), handleEdit);
listingRoutes.put("/verify/:id", verifyVenue)

export default listingRoutes;
