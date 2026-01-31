import mongoose from "mongoose";


const { Schema, model } = mongoose;

const alertSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    scheduledFor: {
      type: Date,
      required: true,
      index: true,
    },

    sent: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

const Alert = model("Alert", alertSchema);
export default Alert;