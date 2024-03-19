import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.

const router = Router();
const ExperiencesCollection = db.collection("experiences");

//Endpoint for getting list of experiences
router.get("/", async (req, res) => {
  try {
    let results = await ExperiencesCollection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error getting list of experiences!").status(500);
  }
});

//Endpoint for getting a single experience by id
router.get("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await ExperiencesCollection.findOne(query);

    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Not found!").status(404);
  }
});

//Endpoint for adding a single experience
router.post("/", async (req, res) => {
  try {
    let newExperience = {
      role: req.body.role,
      company: req.body.company,
      duration: req.body.duration,
      responsibilities: req.body.responsibilities,
      logo: req.body.logo,
    };

    let result = await ExperiencesCollection.insertOne(newExperience);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
    res.send("Error adding a experience").status(500);
  }
});

//Endpoint for updating a experience by the id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        role: req.body.role,
        company: req.body.company,
        duration: req.body.duration,
        responsibilities: req.body.responsibilities,
        logo: req.body.logo,
      },
    };

    let result = await ExperiencesCollection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error updating a experience").status(500);
  }
});

//Endpoint for deleting a experience by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await ExperiencesCollection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error deleting a experience").status(500);
  }
});

export default router;
