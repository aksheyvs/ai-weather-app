import mongoose, { Document } from "mongoose";

export interface IAlert extends Document {
  tenantId: string;
  city: string;
  conditionType: "temperature" | "humidity" | "rain";
  operator: ">" | "<" | ">=" | "<=" | "==";
  value: number;
  checkIntervalHours: number;
  nextCheckAt: Date;
  active: boolean;
  lastTriggeredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const { Schema, model } = mongoose;

const alertSchema = new Schema<IAlert>(
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

    checkIntervalHours: {
      type: Number,
      default: 4,
    },

    nextCheckAt: {
      type: Date,
      required: true,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    lastTriggeredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Alert = model<IAlert>("Alert", alertSchema);
export default Alert;