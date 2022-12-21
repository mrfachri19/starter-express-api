const express = require("express");

const Router = express.Router();

const pasienController = require("./dokterController");
//= ================================================================

//= ===================================================================

Router.get("/dataDokter", pasienController.getAllDokter);
Router.post("/addDokter", pasienController.postDokter);



module.exports = Router;
