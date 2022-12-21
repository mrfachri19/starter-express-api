/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const appointmentModel = require("./appointmentModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getAllAppointment: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "id_pasien ASC";

      let offset = page * limit - limit;
      const totalData = await appointmentModel.getCountAppointment(search);
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

      const result = await appointmentModel.getAllAppointment(
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

  getAppointmentByIdPasien: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await appointmentModel.getAppointmentByIdPasien(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      // ======
      return helperWrapper.response(res, 200, "succes get data by id", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },

  postAppointment: async (req, res) => {
    try {
      const { id_pasien, kode_periksa, appointment, ruangan, nama_pasien } =
        req.body;
      const setData = {
        id_pasien,
        kode_periksa,
        appointment,
        ruangan,
        nama_pasien,
      };
      const result = await appointmentModel.postAppointment(setData);
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

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await appointmentModel.getAppointmentById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      const { id_pasien, kode_periksa, appointment, ruangan, nama_pasien } =
        req.body;
      const setData = {
        id_pasien,
        kode_periksa,
        appointment,
        ruangan,
        nama_pasien,
      };
      // untuk mengupdate salah satu field saja
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });

      const result = await appointmentModel.updateAppointment(setData, id);
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
