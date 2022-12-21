const connection = require("../../config/mysql");

module.exports = {
  registerPasien: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO pasien_management SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pasien_management WHERE email = ?",
        email,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMessage}`));
          }
        }
      );
    }),
    // getUserByUsername: (email) =>
    // new Promise((resolve, reject) => {
    //   connection.query(
    //     "SELECT * FROM pasien_management WHERE username = ?",
    //     email,
    //     (error, result) => {
    //       if (!error) {
    //         resolve(result);
    //       } else {
    //         reject(new Error(`SQL: ${error.sqlMessage}`));
    //       }
    //     }
    //   );
    // }),


};