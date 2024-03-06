import Mongoose from "mongoose";

const { Schema } = Mongoose;

const beachSchema = new Schema({
  name: String,
  waterQuality: String,
  beachLength: Number
});

export const Beach = Mongoose.model("Beach", userSchema);