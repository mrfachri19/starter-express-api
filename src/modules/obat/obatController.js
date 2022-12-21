/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const obatModel = require("./obatModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getAllObat: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_obat ASC";

      let offset = page * limit - limit;
      const totalData = await obatModel.getCountObat(search);
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

      const result = await obatModel.getAllObat(limit, offset, search, sort);

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

  postObat: async (req, res) => {
    try {
      const { nama_obat, stok, category } = req.body;
      const setData = {
        nama_obat,
        stok,
        category,
      };
      const result = await obatModel.postObat(setData);
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

  updateObat: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await obatModel.getObatbyid(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      const { nama_obat, stok, category } = req.body;
      const setData = {
        nama_obat,
        stok,
        category,
      };
      // untuk mengupdate salah satu field saja
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });

      const result = await obatModel.updateObat(setData, id);
      return helperWrapper.response(res, 200, "succes update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
};
