const connection = require("../../config/mysql");

module.exports = {
  getAllObat: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM data_obat WHERE nama_obat LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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

    getObatbyid: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_obat WHERE id = ?",
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

    getCountObat: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM data_obat WHERE nama_obat LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    postObat: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO data_obat SET ?",
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

    updateObat: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE data_obat SET ? WHERE id = ?",
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
