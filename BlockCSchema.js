// blockASchema.js (ES module)
import mongoose from "mongoose";

const occupantSchema = new mongoose.Schema({
  rollNo: String,
  // Add any other properties specific to occupants here if needed
});

const roomSchema = new mongoose.Schema({
  id: Number,
  type: Number,
  occupants: [occupantSchema],
  occupancy: Boolean,
  // Add any other properties specific to rooms here if needed
});

const floorSchema = new mongoose.Schema({
  floor: Number,
  rooms: [roomSchema],
  // Add any other properties specific to floors here if needed
});

const blockCSchema = new mongoose.Schema({
  name: String, // You can include a name for the block if needed
  floors: [floorSchema],
  // Add any other properties specific to the BlockA data here if needed
});

export default mongoose.model('BlockC', blockCSchema);
