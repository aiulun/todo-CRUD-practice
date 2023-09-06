// Declaration of variables
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Todo = require("./models/todo");
const app = express();
const PORT = 8080;
require("dotenv").config({ path: "./config/.env" });

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// GET ROOT ROUTE
app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.render("index.ejs", { todo: todos });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Post request (Adding content)
app.post("/", async (req, res) => {
  const { category, todo } = req.body;
  const todoTask = new Todo({
    category,
    todo,
  });
  try {
    await todoTask.save();
    console.log(todoTask);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
    res.redirect("/");
  }
});

// EDIT/UPDATE Method
app
  .route("/edit/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const todos = await Todo.find({});
      res.render("edit.ejs", {
        todo: todos,
        idTask: id,
      });
    } catch (err) {
      res.status(500).send(err);
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    try {
      const id = req.params.id;
      const { category, todo } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(id, {
        category,
        todo,
      });
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err);
    }
  });

// DELETE
app.route("/remove/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const removeTodo = await Todo.findByIdAndRemove(id, {});
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
