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

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await venueModel.findOne({ _id: id });
    if (!response) {
      return res.status(400).json({
        message: "venue not found",
      });
    }
    return res.status(200).json({
      message: "got the venue",
      venue: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
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
      price,
    } = req.body;
    if (
      (!organiZerId,
      !name,
      !place,
      !capacity,
      !description,
      !spec,
      !rating,
      !price,
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
      spec: JSON.parse(req.body.spec),
      rating,
      type,
      price,
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
    updateData.spec = JSON.parse(req.body.spec);

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

const verifyVenue = async (req, res) => {
  try {
    const { id } = req.params;

    const verify = await venueModel.findByIdAndUpdate(
      id,
      { $set: { isApproved: "yes" } },
      { new: true },
    );

    if (!verify) {
      return res.status(400).json({
        message: "Venue not found",
      });
    }

    return res.status(200).json({
      message: "Venue verified..",
    });
  } catch (error) {
    return res.status(200).json({
      message: error,
    });
  }
};

const getVenueOrg = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await venueModel.find({ organiZerId: id });
    if (!response) {
      return res.status(400).json({
        message: "Listed venue not found",
      });
    }

    return res.status(200).json({
      venue: response,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export {
  getAll,
  handleRegister,
  handleDelete,
  handleEdit,
  getOne,
  verifyVenue,
  getVenueOrg,
};
