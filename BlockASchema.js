// blockASchema.js (ES module)
import mongoose from "mongoose";

const occupantSchema = new mongoose.Schema({
  rollNo: String,
});

// Define a schema for individual rooms
const roomSchema = new mongoose.Schema({
  id: String,
  type: Number,
  occupants: [occupantSchema], // Array of occupants
  occupancy: Boolean,
});

// Define a schema for the entire block
const blockASchema = new mongoose.Schema({
  floor: Number,
  rooms: [roomSchema], // Array of rooms
});

export default mongoose.model('BlockA', blockASchema);
