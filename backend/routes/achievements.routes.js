import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.

const router = Router();
const AchievementsCollection = db.collection("achievements");

//Endpoint for getting list of achievements
router.get("/", async (req, res) => {
  try {
    let results = await AchievementsCollection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error getting list of achievements!").status(500);
  }
});

//Endpoint for getting a single achievement by id
router.get("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await AchievementsCollection.findOne(query);

    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Not found!").status(404);
  }
});

//Endpoint for adding a single achievement
router.post("/", async (req, res) => {
  try {
    let newAchievement = {
      achievement: req.body.achievement,
      description: req.body.description,
      image: req.body.image,
    };

    let result = await AchievementsCollection.insertOne(newAchievement);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
    res.send("Error adding a achievement").status(500);
  }
});

//Endpoint for updating a achievement by the id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        achievement: req.body.achievement,
        description: req.body.description,
        image: req.body.image,
      },
    };

    let result = await AchievementsCollection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error updating a achievement").status(500);
  }
});

//Endpoint for deleting a achievement by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await AchievementsCollection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error deleting a achievement").status(500);
  }
});

export default router;
