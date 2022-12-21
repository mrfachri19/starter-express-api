const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const helperWrapper = require("../../helper/wrapper");
const authPasienModel = require("./authPasienModel");
// const userModel = require("../user/userModel");
// const redis = require("../../config/redis");
// const sendMail = require("../../helper/email/index");
require("dotenv").config();

module.exports = {
  registerPasien: async (req, res) => {
    try {
      const { username, nama, email, password } = req.body;

      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      const checkUser = await authPasienModel.getUserByEmail(email);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, `Email already used`, null);
      }

      // Proses Validasi input form
      if (
        email.length < 1 ||
        password.length < 1 ||
        nama.length < 1 
      ) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);

      const setData = {
        id: uuidv4(),
        username,
        nama,
        email,
        password: hashPassword,
        role: "pasien",
      };

      const result = await authPasienModel.registerPasien(setData);
      // const setDataMail = {
      //   to: result.email,
      //   subject: "Email Verification",
      //   template: "email-verification",
      //   data: {
      //     id: result.id,
      //     email: result.email,
      //     link: process.env.URL_BACKEND,
      //   },
      // };

      // await sendMail(setDataMail);
      return helperWrapper.response(
        res,
        200,
        "Success register user, please verify your email",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request, ${error.message}`,
        null
      );
    }
  },
  
  loginPasien: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const checkUser = await authPasienModel.getUserByEmail(email);
      // const checUsername = await authPasienModel.getUserByUsername(username);


      // Proses Validasi input form
      if (email.length < 1 || password.length < 1 || username.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      const passwordUser = await bcryptjs.compare(
        password,
        checkUser[0].password
      );
      console.log(checkUser[0]);
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0];
      console.log(payload)
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      // Add refresh token
      const refreshToken = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "72h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
        name: payload.nama,
        username: payload.username,
        role: payload.role
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};