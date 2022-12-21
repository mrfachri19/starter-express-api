/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const preceptionModel = require("./preceptionModel");
const helperWrapper = require("../../helper/wrapper");
const ejs = require("ejs");
const path = require("path");
const htmlPdf = require("html-pdf");

module.exports = {
  getAllPreception: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_pasien ASC";

      let offset = page * limit - limit;
      const totalData = await preceptionModel.getCountPreception(search);
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

      const result = await preceptionModel.getAllPreception(
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

  postPreception: async (req, res) => {
    try {
      const {
        id_pasien,
        kode_rm,
        nama_pasien,
        keluhan,
        diagnosis,
        therapy,
        obat,
      } = req.body;
      const setData = {
        id_pasien,
        kode_rm,
        nama_pasien,
        keluhan,
        diagnosis,
        therapy,
        obat,
      };
      const result = await preceptionModel.postPreception(setData);
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

  exportrekammedisPdf: async (request, response) => {
    try {
      const { id } = request.params;
      const fileName = `Rekammedis-${id}.pdf`;
      // const userBooking = await preceptionModel.getExportPdfByIdRekammedis(id);
      const preception = await preceptionModel.getExportPdfByIdRekammedis(id);

      // join seat => ['A1', 'A2', 'A3']
      // console.log(userBooking);
  
      // const seatBooking = userBooking.map((value) => value.seat);
      const newData = [];
      // eslint-disable-next-line array-callback-return
      preception.map((value) => {
        const setNewData = {
          ...value,
        };
        newData.push(setNewData);
      });
      const newDataPreception = newData[0];

      const newDataPreceptionPdf = {
        ...newDataPreception,
        // dateBooking: moment().format("DD MMM"),
        // timeBooking: moment().format("LT"),
        // seat: seatBooking,
        // ticketActive: `http://${request.get("host")}/booking/used-ticket/${
        //   newDataBooking.id
        // }`,
      };
      console.log(newDataPreceptionPdf)
      ejs.renderFile(
        path.resolve("./src/templates/pdf/preception.ejs"),
        { newDataPreceptionPdf },
        (error, results) => {
          if (!error) {
            const options = {
              height: "11.25in",
              width: "10.5in",
            };
            htmlPdf.create(results, options).toFile(
              path.resolve(`./public/generate/${fileName}`),
              // eslint-disable-next-line no-shadow
              (error) => {
                if (error) {
                  return helperWrapper.response(response, 400, error.message);
                }
                return helperWrapper.response(
                  response,
                  200,
                  "Success Generate data!",
                  [newDataPreceptionPdf],
                  {
                    url: `http://localhost:3001/generate/${fileName}`,
                  }
                );
              }
            );
          }
        }
      );
    } catch (error) {
      return helperWrapper.response(
        response,
        400,
        `Bad Request : ${error.message}`
      );
    }
  }
};


