import mongoose from "mongoose";

const specSchema = mongoose.Schema(
  {
    spec: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const venueSchema = mongoose.Schema(
  {
    organiZerId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    capacity: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    spec: {
      type: [specSchema],
      require: true,
    },
    isApproved: {
      type: String,
      enum: ["no", "yes"],
      default: "no",
    },
  },
  { timestamp: true },
);

export const venueModel = mongoose.model("venues", venueSchema);
