import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface InterfaceEntry extends Entry {}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "Status must be either pending, in-progress or finished",
    },
    default: "pending",
  },
});

const EntryModel: Model<InterfaceEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
