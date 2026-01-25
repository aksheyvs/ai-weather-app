import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const {Schema, model} = mongoose

const logsSchema = new Schema(
    {
  "_id": ObjectId,
  "tenantId": String,
  "type": String,
  "status": String,
  "details": String,
  "createdAt": Date
}

);

const Logs = model("Logs", logsSchema);
export default Logs;