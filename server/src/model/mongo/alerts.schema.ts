import { required } from "joi";
import mongoose from "mongoose";


const { Schema, model } = mongoose;

const alertSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    city: {
      type: String,
      require: true,
      lowercase: true,
      index: true,
    },

    conditionType: {
      type: String,
      enum: ["temperature", "humidity", "rain"],
      required: true,
    },

    operator: {
      type: String,
      enum: [">", "<", ">=", "<=", "=="],
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    triggered: {
      type: Boolean,
      default: false,
    },

    lestTriggeredAt: {
      type: Date,
    },

  },
  { timestamps: true }
);

const Alert = model("Alert", alertSchema);
export default Alert;