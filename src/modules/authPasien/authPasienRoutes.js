const express = require("express");

const Router = express.Router();

const authPasienController = require("./authPasienController");

Router.post("/registerpasien",  authPasienController.registerPasien);
Router.post("/loginpasien", authPasienController.loginPasien);

module.exports = Router;