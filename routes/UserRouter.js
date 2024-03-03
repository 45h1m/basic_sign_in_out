const express = require("express");
const Router = express.Router();

const authorize = require("../controllers/authorize");
const { sendUsers, createUser, deleteUser, signIn } = require("../controllers/UserController");

Router.get('/', authorize, sendUsers)
Router.post("/signup", createUser);
Router.post("/signin", signIn);
Router.delete("/", authorize, deleteUser);

module.exports = Router;