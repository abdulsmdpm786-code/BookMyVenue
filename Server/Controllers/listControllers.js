import { venueModel } from "../Models/venueModel.js";
import { uploadCloudinary } from "../utilities/cloudinaryUtility.js";
import fs from "fs";

const getAll = async (req, res) => {
  try {
    const venues = await venueModel.find();
    if (!venues) {
      return res.status(400).json({
        message: "No venues found..",
      });
    }

    return res.status(200).json({
      message: "Got venues",
      venue: venues,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleRegister = async (req, res) => {
  try {
    const {
      organiZerId,
      name,
      place,
      capacity,
      description,
      spec,
      rating,
      type,
    } = req.body;
    if (
      (!organiZerId,
      !name,
      !place,
      !capacity,
      !description,
      !spec,
      !rating,
      !type)
    ) {
      return res.status(400).json({
        message: "All fields are required..",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image not provided..",
      });
    }

    const imageURL = await uploadCloudinary(req.file.path);

    const newVenue = await venueModel.create({
      organiZerId,
      name,
      place,
      capacity,
      description,
      spec,
      rating,
      type,
      image: imageURL,
    });

    return res.status(200).json({
      message: "venue created..",
      venue: newVenue,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleDelete = async (req, res) => {
  try {
    const { venueId } = req.params;
    if (!venueId) {
      return res.status(404).json({
        message: "No id found..",
      });
    }

    const deleteRes = await venueModel.findByIdAndDelete({ _id: venueId });
    if (!deleteRes) {
      return res.status(400).json({
        message: "No venue found..",
      });
    }

    return res.status(200).json({
      message: "Deleted successfully",
      venue: deleteRes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleEdit = async (req, res) => {
  try {
    const { venueId } = req.params;

  
    const updateData = { ...req.body };

    if (req.file) {
      const courseUrl = await uploadCloudinary(req.file.path);
      updateData.image = courseUrl;
      fs.unlinkSync(req.file.path);
    }
    const editRes = await venueModel.findByIdAndUpdate(
      venueId,
      {
        $set: updateData,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Data edited..",
      venue: editRes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export { getAll, handleRegister, handleDelete, handleEdit };
