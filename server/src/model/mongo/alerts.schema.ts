import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const {Schema, model} = mongoose;

const alertSchema = new Schema(
    {
  "_id": ObjectId,
  "tenantId": String,
  "type": String,
  "severity": String,
  "message": String,
  "channels": [String],
  "isSent": Boolean,
  "createdAt": Date
});

const Alert = model("Alert", alertSchema);
export default Alert;