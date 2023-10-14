import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
// import { Student } from "./User.js";
// import { BlockA } from "./BlockA.js";
// import { BlockB } from "./BlockB.js";
// import { BlockC } from "./BlockC.js";
// import { BlockD } from "./BlockD.js";

import BlockA from "./BlockASchema.js"
import BlockB from "./BlockBSchema.js"
import BlockC from "./BlockCSchema.js"
import BlockD from "./BlockDSchema.js"


const app = express();
const port = 4000;

app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Hostel', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


const roomChangeRequestSchema = new mongoose.Schema({
  seater: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  roomPreference: {
    type: String,
    required: true,
  },
  blockPreference: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});


const RoomChangeRequest = mongoose.model('RoomChangeRequest', roomChangeRequestSchema);

app.post("/Room_change_request", async (req, res) => {
  const newFormData = req.body;
  console.log(newFormData);

  try {
    // Create a new document in the RoomChangeRequest collection
    const request = new RoomChangeRequest(newFormData);
    await request.save();

    res.json({ message: "Form data added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/Room_change_request", async (req, res) => {
  try {
    // Retrieve all RoomChangeRequest documents from the collection
    const requests = await RoomChangeRequest.find().exec();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Define models and routes for other data as needed

// app.get("/Students", (req, res) => {
//   res.json(Student);
// });

const studentSchema = new mongoose.Schema({
  id: String,
  Name: String,
  Department: String,
  Block: String,
  Room: String,
  Year: String,
  SeaterType: String,
  Due: Boolean,
  Allocation: Boolean,
  RoomChangeRequest: Boolean,
  Phone: Number,
});

const Student = mongoose.model('Student', studentSchema);

app.get("/Students", async (req, res) => {
  const userIdToFetch = req.query.Id; // Get the Id from the query parameter
  try {
    const student = await Student.findOne({ id: userIdToFetch }).exec(); // Find the student based on the Id
    res.json(student);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.get("/blockA", async (req, res) => {
  try {
    const blockAData = await BlockA.find().exec();
    res.json(blockAData);
  } catch (error) {
    console.error("Error fetching BlockA data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/blockB", async (req, res) => {
  try {
    const blockBData = await BlockB.find().exec();
    res.json(blockBData);
  } catch (error) {
    console.error("Error fetching BlockB data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/blockC", async (req, res) => {
  try {
    const blockCData = await BlockC.find().exec();
    res.json(blockCData);
  } catch (error) {
    console.error("Error fetching BlockC data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/blockD", async (req, res) => {
  try {
    const blockDData = await BlockD.find().exec();
    res.json(blockDData);
  } catch (error) {
    console.error("Error fetching BlockD data:", error);
    res.status(500).json({ error: "An error occurred" });
  }

});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
