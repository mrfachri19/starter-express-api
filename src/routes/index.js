const express = require("express");

const Router = express.Router();
const pasienRoutes = require("../modules/pasien/pasienRoutes");
const appointmentRoutes = require("../modules/appointment/appointmentRoutes");
const dokterRoutes = require("../modules/dokter/dokterRoutes");
const authRoutes  = require("../modules/auth/authRoutes");
const authPasienRoutes  = require("../modules/authPasien/authPasienRoutes");
const obatRoutes  = require("../modules/obat/obatRoutes");
const preceptionRoutes  = require("../modules/preception/preceptionRoutes");



// Router.use("/hello", helloRoutes);
Router.use("/pasien", pasienRoutes);
Router.use("/appointment", appointmentRoutes);
Router.use("/dokter", dokterRoutes);
Router.use("/auth", authRoutes);
Router.use("/authpasien", authPasienRoutes);
Router.use("/obat", obatRoutes);
Router.use("/preception", preceptionRoutes);

module.exports = Router;
