const express = require("express");

const Router = express.Router();

const obatController = require("./obatController");
//= ================================================================

//= ===================================================================

Router.post("/addObat", obatController.postObat);
Router.get("/dataObat", obatController.getAllObat);
Router.patch("/editObat/:id", obatController.updateObat);




module.exports = Router;
