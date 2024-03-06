import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  name: String
});

export const Location = Mongoose.model("Location", userSchema);