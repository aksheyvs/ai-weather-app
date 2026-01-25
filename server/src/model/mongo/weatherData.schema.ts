import mongoose from "mongoose";

const { Schema, model} = mongoose;

const weatherSchema = new Schema(
{
  tenantId: {
    type: String,
    required: true,
    index: true,
  },

  location: {
    lat: {type: Number},
    lon: {type: Number},
    city: {type: String, required: true, index: true}
  },

  temperature: {
    type: Number,
    required: true,
  },

  humidity: {
    type: Number,
    require: true,
  },

  rain: {
    type: Boolean,
    default: false,
  },

  source: {
    type: String,
    default: "openweather"
  },

  recordedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
},
{
  timestamps: true,
}
);

const Weather = model("Weather", weatherSchema);
export default Weather;