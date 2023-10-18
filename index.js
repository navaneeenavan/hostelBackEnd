import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

// import { Student } from "./User.js";
// import { BlockA } from "./BlockA.js";
// import { BlockB } from "./BlockB.js";
// import { BlockC } from "./BlockC.js";
// import { BlockD } from "./BlockD.js";

import BlockA from "./BlockASchema.js";
import BlockB from "./BlockBSchema.js";
import BlockC from "./BlockCSchema.js";
import BlockD from "./BlockDSchema.js";


import BlockCSchema from "./BlockCSchema.js";
import BlockASchema from "./BlockASchema.js";
import BlockBSchema from "./BlockBSchema.js";
import BlockDSchema from "./BlockDSchema.js";

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

mongoose.connect("mongodb://localhost:27017/Hostel", {
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

const RoomChangeRequest = mongoose.model(
  "RoomChangeRequest",
  roomChangeRequestSchema
);

app.post("/Room_change_request", async (req, res) => {
  const newFormData = req.body;
  console.log(newFormData);

  try {
    // Create a new document in the RoomChangeRequest collection
    const request = new RoomChangeRequest(newFormData);
    await request.save();

    res.json({ message: "Form data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
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
  Phone: String,
  request: Boolean,
  ReallocationReason: String,
  Message: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/Students", async (req, res) => {
  try {
    const students = await Student.find().exec();
    res.json(students);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.route("/Students/updateAllocation/:id").post(async (req, res) => {
  const { id } = req.params; // Get the student's ID from the URL
  const { allocationStatus, Block, Room, SeaterType } = req.body;

  try {
    // Find the student by ID and update the Allocation, Block, Room, and SeaterType fields
    const updatedStudent = await Student.findOneAndUpdate(
      { id: id },
      {
        Allocation: allocationStatus,
        Block: Block,
        Room: Room,
        SeaterType: SeaterType
      },
      { new: true } // Ensure the updated document is returned
    ).exec();

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }


    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating Allocation:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});




app.post("/Students/updateReallocationReason/:id", async (req, res) => {
  const { id } = req.params; // Get the student's ID from the URL
  const { ReallocationReason } = req.body; // Get the ReallocationReason from the request

  console.log(req.body, "RR");

  try {
    
    const updatedStudent = await Student.findOneAndUpdate(
      { id: id },
      { ReallocationReason: ReallocationReason }, 
      { new: true } 
    ).exec();

    console.log(updatedStudent, "UPDATE");

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating ReallocationReason:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DO NOT TOUCH THE ABOVE

app.post("/Students/updateMessage/:id", async (req, res) => {
  const { id } = req.params;
  const { Message } = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: id },
      { Message: Message },
      { new: true }
    ).exec();

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found", id: id });
    }
    await RoomChangeRequest.deleteOne({ rollNo: id });
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating Message:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// do not touch below

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

// do not touch the above code
// ...

// Import necessary modules and models

// ...

app.post("/updateOccupant/:block/:room", async (req, res) => {
  const { block, room } = req.params;
  const { rollNo } = req.body;

  if (!rollNo) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  let BlockSchema;
  switch (block) {
    case "A":
      BlockSchema = BlockASchema;
      break;
    case "B":
      BlockSchema = BlockBSchema;
      break;
    case "C":
      BlockSchema = BlockCSchema; // Corrected to use BlockCSchema
      break;
    case "D":
      BlockSchema = BlockDSchema;
      break;
    default:
      return res.status(400).json({ error: "Invalid block" });
  }

  try {
    // Find all documents
    const blockDocs = await BlockSchema.find({});
  
    if (!blockDocs || blockDocs.length === 0) {
      return res.status(404).json({ error: "No blocks found" });
    }
  
    let foundRoom = null;
    let foundBlock = null;
  
    // Loop through all block documents
    for (const blockDoc of blockDocs) {
      const { rooms } = blockDoc;
      const roomInBlock = rooms.find((r) => r.id === room);
  
      if (roomInBlock) {
        foundRoom = roomInBlock;
        foundBlock = blockDoc;
        break; // Exit the loop if the room is found
      }
    }
  
    if (!foundBlock || !foundRoom) {
      return res.status(404).json({ error: "Room not found" });
    }
  
    // Update the room's occupants
    foundRoom.occupants.push({ rollNo });
  
    // Save the updated block document back to the database
    await foundBlock.save();
  
    res.json(foundBlock);
  } catch (error) {
    console.error("Error updating occupants:", error);
    res.status(500).json({ error: "An error occurred" });
  }  
});

// Start your server

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
