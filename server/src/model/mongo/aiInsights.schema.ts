import mongoose from "mongoose";

const {Schema, model} = mongoose;

const aiInsightSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    city: {
      type: String,
      required: true,
    },

    weatherSnapshot: {
      temperature: Number,
      humidity: Number,
      rain: Boolean,
    },

    insight: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["farming", "outdoor", "general"],
      default: "general",
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true}
);

const AiInsight = model("AiInsight", aiInsightSchema);
export default AiInsight;