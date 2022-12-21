const connection = require("../../config/mysql");

module.exports = {
  getAllPasien: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM data_pasien WHERE nama_pasien LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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

  getCountPasien: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM data_pasien WHERE nama_pasien LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

    postPasien: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO data_pasien SET ?",
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

};
