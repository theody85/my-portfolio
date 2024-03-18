import { Router } from "express";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.
import db from "../db/connection.js";

const router = Router();
const POSTS_COLLECTION = db.collection("posts");

// This section will help you get a list of all posts
router.get("/", async (req, res) => {
  let results = await POSTS_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single post by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await POSTS_COLLECTION.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new post.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      content: req.body.content,
    };
    let result = await POSTS_COLLECTION.insertOne(newDocument);
    res.send(result).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding post");
  }
});

// This section will help you update a post by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    };

    let result = await POSTS_COLLECTION.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});

// This section will help you delete a post
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await POSTS_COLLECTION.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});

export default router;
