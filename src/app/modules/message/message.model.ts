import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
