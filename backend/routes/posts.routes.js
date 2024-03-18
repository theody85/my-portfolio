import { Router } from "express";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.
import db from "../db/connection.js";

const router = Router();
const PostsCollection = db.collection("posts");

//Endpoint for getting list of posts
router.get("/", async (req, res) => {
  try {
    let results = await PostsCollection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error getting list of posts!").status(500);
  }
});

//Endpoint for getting a single post by id
router.get("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await PostsCollection.findOne(query);

    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Not found!").status(404);
  }
});

//Endpoint for adding a single post
router.post("/", async (req, res) => {
  try {
    let newPost = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    };

    let result = await PostsCollection.insertOne(newPost);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
    res.send("Error adding a post").status(500);
  }
});

//Endpoint for updating a post by the id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
      },
    };

    let result = await PostsCollection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error updating a post").status(500);
  }
});

//Endpoint for deleting a post by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await PostsCollection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.send("Error deleting a post").status(500);
  }
});

export default router;
