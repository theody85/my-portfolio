import { Router } from "express";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.
import db from "../db/connection.js";

const router = Router();
const ProjectsCollection = db.collection("projects");

//Endpoint for getting list of projects
router.get("/", async (req, res) => {
  try {
    let results = await ProjectsCollection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error getting list of projects!").status(500);
  }
});

//Endpoint for getting a single project by id
router.get("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await ProjectsCollection.findOne(query);

    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Not found!").status(404);
  }
});

//Endpoint for adding a single project
router.post("/", async (req, res) => {
  try {
    let newProject = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
    };

    let result = await ProjectsCollection.insertOne(newProject);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
    res.send("Error adding a project").status(500);
  }
});

//Endpoint for updating a project by the id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
      },
    };

    let result = await ProjectsCollection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error updating a project").status(500);
  }
});

//Endpoint for deleting a project by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await ProjectsCollection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error deleting a project").status(500);
  }
});

export default router;
