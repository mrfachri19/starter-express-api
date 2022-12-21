const connection = require("../../config/mysql");

module.exports = {
  getAllPreception: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM data_preception WHERE id_pasien LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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

    getCountPreception: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM data_preception WHERE nama_pasien LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    postPreception: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO data_preception SET ?",
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

    getExportPdfByIdRekammedis: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM data_preception WHERE id = ?",
        id,
        (error, results) => {
          if (!error) {
            resolve(results);
          } else {
            reject(new Error(`Message : ${error.message}`));
          }
        }
      );
    }),
};
