import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  venueId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
});

export const orderModel = mongoose.model("order", orderSchema);
