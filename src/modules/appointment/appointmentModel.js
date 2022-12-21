const connection = require("../../config/mysql");

module.exports = {
  getAllAppointment: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM data_appointment WHERE id_pasien LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    getAppointmentByIdPasien: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_appointment WHERE id_pasien = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    getAppointmentById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_appointment WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    getCountAppointment: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM data_appointment WHERE id_pasien LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    postAppointment: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO data_appointment SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),

    updateAppointment: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE data_appointment SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),

};
