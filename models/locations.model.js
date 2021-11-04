
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationsSchema = new Schema(
  {
    name: String,
    longitude: Number,
    latitude: Number,
    kilometers: Number,
    miles: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Locations = mongoose.model("Locations", locationsSchema);

module.exports = Locations;
