/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const pasienModel = require("./dokterModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getAllDokter: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_dokter ASC";

      let offset = page * limit - limit;
      const totalData = await pasienModel.getCountDokter(search);
      const totalPage = Math.ceil(totalData / limit);

      if (totalPage < page) {
        offset = 0;
        page = 1;
      }

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await pasienModel.getAllDokter(
        limit,
        offset,
        search,
        sort
      );

      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
      }

      return helperWrapper.response(
        res,
        200,
        "Success get data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },

  postDokter: async (req, res) => {
    try {
      const {
        nama_dokter,
        username,
        statusAktif
      } = req.body;
      const setData = {
        nama_dokter,
        username,
        statusAktif
      };
      const result = await pasienModel.postDokter(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },

  // getDokterById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const result = await movieModel.getDokterById(id);
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }
  //     // PROSES UNTUK MENYIMPAN DATA KE DALAM REDIS
  //     // =====
  //     redis.setex(`getDokter:${id}`, 3600, JSON.stringify(result));
  //     // ======
  //     return helperWrapper.response(res, 200, "succes get data by id", result);
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },

};
