const express = require("express");

const Router = express.Router();

const appointmentController = require("./appointmentController");
//= ================================================================

//= ===================================================================

Router.post("/addAppointment", appointmentController.postAppointment);
Router.get("/dataAppointment", appointmentController.getAllAppointment);
Router.patch("/upadateAppointment/:id", appointmentController.updateAppointment);
Router.get(
    "/:id",
    appointmentController.getAppointmentByIdPasien
  );


module.exports = Router;
