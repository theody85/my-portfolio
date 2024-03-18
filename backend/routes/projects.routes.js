import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = db.collection("projects");

//Endpoint for getting list of skills
router.get("/", async (req, res) => {
  let results = await PROJECTS_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

//Endpoint for getting a single skill by id
router.get("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await PROJECTS_COLLECTION.findOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(404).send("Not found!");
  }
});

//Endpoint for adding a single skill
router.post("/", async (req, res) => {
  try {
    let newSkill = {
      skill: req.body.skill,
      proficiency: req.body.proficiency,
    };

    let result = await PROJECTS_COLLECTION.insertOne(newSkill);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding a skill");
  }
});

//Endpoint for updating a skill by the id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        skill: req.body.skill,
        proficiency: req.body.proficiency,
      },
    };

    let result = await PROJECTS_COLLECTION.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating a skill");
  }
});

//Endpoint for deleting a skill by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await PROJECTS_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting a skill");
  }
});

export default router;
