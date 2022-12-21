const express = require("express");

const Router = express.Router();

const preceptionController = require("./preceptionController");
//= ================================================================

//= ===================================================================

Router.post("/addPreception", preceptionController.postPreception);
Router.get("/dataPreception", preceptionController.getAllPreception);
Router.get("/dataPreception/:id", preceptionController.exportrekammedisPdf);


module.exports = Router;
