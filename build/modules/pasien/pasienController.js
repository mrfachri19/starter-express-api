/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const pasienModel = require("./pasienModel");
const helperWrapper = require("../../helper/wrapper");
const {
  v4: uuidv4
} = require("uuid");
module.exports = {
  getAllPasien: async (req, res) => {
    try {
      let {
        page,
        limit,
        search,
        sort
      } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama_pasien ASC";
      let offset = page * limit - limit;
      const totalData = await pasienModel.getCountPasien(search);
      const totalPage = Math.ceil(totalData / limit);
      if (totalPage < page) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      };
      const result = await pasienModel.getAllPasien(limit, offset, search, sort);
      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
      }
      return helperWrapper.response(res, 200, "Success get data", result, pageInfo);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  postPasien: async (req, res) => {
    try {
      const {
        kode_rm,
        nama_pasien,
        jenis_kelamin,
        umur,
        alamat,
        pengobatan,
        td,
        diagnosa,
        therapy,
        bagian
      } = req.body;
      const setData = {
        id: uuidv4(),
        kode_rm,
        nama_pasien,
        jenis_kelamin,
        umur,
        alamat,
        pengobatan,
        td,
        diagnosa,
        therapy,
        bagian
      };
      const result = await pasienModel.postPasien(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  }

  // getPasienById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const result = await movieModel.getPasienById(id);
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
  //     redis.setex(`getPasien:${id}`, 3600, JSON.stringify(result));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXNpZW5Nb2RlbCIsInJlcXVpcmUiLCJoZWxwZXJXcmFwcGVyIiwidjQiLCJ1dWlkdjQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0QWxsUGFzaWVuIiwicmVxIiwicmVzIiwicGFnZSIsImxpbWl0Iiwic2VhcmNoIiwic29ydCIsInF1ZXJ5IiwiTnVtYmVyIiwib2Zmc2V0IiwidG90YWxEYXRhIiwiZ2V0Q291bnRQYXNpZW4iLCJ0b3RhbFBhZ2UiLCJNYXRoIiwiY2VpbCIsInBhZ2VJbmZvIiwicmVzdWx0IiwibGVuZ3RoIiwicmVzcG9uc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJwb3N0UGFzaWVuIiwia29kZV9ybSIsIm5hbWFfcGFzaWVuIiwiamVuaXNfa2VsYW1pbiIsInVtdXIiLCJhbGFtYXQiLCJwZW5nb2JhdGFuIiwidGQiLCJkaWFnbm9zYSIsInRoZXJhcHkiLCJiYWdpYW4iLCJib2R5Iiwic2V0RGF0YSIsImlkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFzaWVuL3Bhc2llbkNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXHJcbmNvbnN0IHBhc2llbk1vZGVsID0gcmVxdWlyZShcIi4vcGFzaWVuTW9kZWxcIik7XHJcbmNvbnN0IGhlbHBlcldyYXBwZXIgPSByZXF1aXJlKFwiLi4vLi4vaGVscGVyL3dyYXBwZXJcIik7XHJcbmNvbnN0IHsgdjQ6IHV1aWR2NCB9ID0gcmVxdWlyZShcInV1aWRcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBnZXRBbGxQYXNpZW46IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHsgcGFnZSwgbGltaXQsIHNlYXJjaCwgc29ydCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBwYWdlID0gTnVtYmVyKHBhZ2UpIHx8IDE7XHJcbiAgICAgIGxpbWl0ID0gTnVtYmVyKGxpbWl0KSB8fCAxMDtcclxuICAgICAgc2VhcmNoID0gc2VhcmNoIHx8IFwiXCI7XHJcbiAgICAgIHNvcnQgPSBzb3J0IHx8IFwibmFtYV9wYXNpZW4gQVNDXCI7XHJcblxyXG4gICAgICBsZXQgb2Zmc2V0ID0gcGFnZSAqIGxpbWl0IC0gbGltaXQ7XHJcbiAgICAgIGNvbnN0IHRvdGFsRGF0YSA9IGF3YWl0IHBhc2llbk1vZGVsLmdldENvdW50UGFzaWVuKHNlYXJjaCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0b3RhbERhdGEgLyBsaW1pdCk7XHJcblxyXG4gICAgICBpZiAodG90YWxQYWdlIDwgcGFnZSkge1xyXG4gICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgcGFnZSA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhZ2VJbmZvID0ge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgdG90YWxQYWdlLFxyXG4gICAgICAgIGxpbWl0LFxyXG4gICAgICAgIHRvdGFsRGF0YSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhc2llbk1vZGVsLmdldEFsbFBhc2llbihcclxuICAgICAgICBsaW1pdCxcclxuICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgc2VhcmNoLFxyXG4gICAgICAgIHNvcnRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgMjAwLCBgRGF0YSBub3QgZm91bmQgIWAsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgICAgICAgcmVzLFxyXG4gICAgICAgIDIwMCxcclxuICAgICAgICBcIlN1Y2Nlc3MgZ2V0IGRhdGFcIixcclxuICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgcGFnZUluZm9cclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxyXG4gICAgICAgIHJlcyxcclxuICAgICAgICA0MDAsXHJcbiAgICAgICAgYEJhZCByZXF1ZXN0ICgke2Vycm9yLm1lc3NhZ2V9KWAsXHJcbiAgICAgICAgbnVsbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHBvc3RQYXNpZW46IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGtvZGVfcm0sXHJcbiAgICAgICAgbmFtYV9wYXNpZW4sXHJcbiAgICAgICAgamVuaXNfa2VsYW1pbixcclxuICAgICAgICB1bXVyLFxyXG4gICAgICAgIGFsYW1hdCxcclxuICAgICAgICBwZW5nb2JhdGFuLFxyXG4gICAgICAgIHRkLFxyXG4gICAgICAgIGRpYWdub3NhLFxyXG4gICAgICAgIHRoZXJhcHksXHJcbiAgICAgICAgYmFnaWFuXHJcbiAgICAgIH0gPSByZXEuYm9keTtcclxuICAgICAgY29uc3Qgc2V0RGF0YSA9IHtcclxuICAgICAgICBpZDogdXVpZHY0KCksXHJcbiAgICAgICAga29kZV9ybSxcclxuICAgICAgICBuYW1hX3Bhc2llbixcclxuICAgICAgICBqZW5pc19rZWxhbWluLFxyXG4gICAgICAgIHVtdXIsXHJcbiAgICAgICAgYWxhbWF0LFxyXG4gICAgICAgIHBlbmdvYmF0YW4sXHJcbiAgICAgICAgdGQsXHJcbiAgICAgICAgZGlhZ25vc2EsXHJcbiAgICAgICAgdGhlcmFweSxcclxuICAgICAgICBiYWdpYW5cclxuICAgICAgfTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcGFzaWVuTW9kZWwucG9zdFBhc2llbihzZXREYXRhKTtcclxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UocmVzLCAyMDAsIFwiU3VjY2VzIGNyZWF0ZSBkYXRhXCIsIHJlc3VsdCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShcclxuICAgICAgICByZXMsXHJcbiAgICAgICAgNDAwLFxyXG4gICAgICAgIGBiYWQgcmVxdWVzdCAoJHtlcnJvci5tZXNzYWdlfSlgLFxyXG4gICAgICAgIG51bGxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBnZXRQYXNpZW5CeUlkOiBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAvLyAgIHRyeSB7XHJcbiAgLy8gICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgLy8gICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1vdmllTW9kZWwuZ2V0UGFzaWVuQnlJZChpZCk7XHJcbiAgLy8gICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMSkge1xyXG4gIC8vICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxyXG4gIC8vICAgICAgICAgcmVzLFxyXG4gIC8vICAgICAgICAgNDA0LFxyXG4gIC8vICAgICAgICAgYGRhdGEgYnkgaWQgJHtpZH0gbm90IGZvdW5kICFgLFxyXG4gIC8vICAgICAgICAgbnVsbFxyXG4gIC8vICAgICAgICk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgICAgLy8gUFJPU0VTIFVOVFVLIE1FTllJTVBBTiBEQVRBIEtFIERBTEFNIFJFRElTXHJcbiAgLy8gICAgIC8vID09PT09XHJcbiAgLy8gICAgIHJlZGlzLnNldGV4KGBnZXRQYXNpZW46JHtpZH1gLCAzNjAwLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAvLyAgICAgLy8gPT09PT09XHJcbiAgLy8gICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgMjAwLCBcInN1Y2NlcyBnZXQgZGF0YSBieSBpZFwiLCByZXN1bHQpO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAvLyAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXHJcbiAgLy8gICAgICAgcmVzLFxyXG4gIC8vICAgICAgIDQwMCxcclxuICAvLyAgICAgICBgYmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcclxuICAvLyAgICAgICBudWxsXHJcbiAgLy8gICAgICk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLE1BQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUM1QyxNQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztBQUNyRCxNQUFNO0VBQUVFLEVBQUUsRUFBRUM7QUFBTyxDQUFDLEdBQUdILE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFFdENJLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2ZDLFlBQVksRUFBRSxPQUFPQyxHQUFHLEVBQUVDLEdBQUcsS0FBSztJQUNoQyxJQUFJO01BQ0YsSUFBSTtRQUFFQyxJQUFJO1FBQUVDLEtBQUs7UUFBRUMsTUFBTTtRQUFFQztNQUFLLENBQUMsR0FBR0wsR0FBRyxDQUFDTSxLQUFLO01BQzdDSixJQUFJLEdBQUdLLE1BQU0sQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQztNQUN4QkMsS0FBSyxHQUFHSSxNQUFNLENBQUNKLEtBQUssQ0FBQyxJQUFJLEVBQUU7TUFDM0JDLE1BQU0sR0FBR0EsTUFBTSxJQUFJLEVBQUU7TUFDckJDLElBQUksR0FBR0EsSUFBSSxJQUFJLGlCQUFpQjtNQUVoQyxJQUFJRyxNQUFNLEdBQUdOLElBQUksR0FBR0MsS0FBSyxHQUFHQSxLQUFLO01BQ2pDLE1BQU1NLFNBQVMsR0FBRyxNQUFNakIsV0FBVyxDQUFDa0IsY0FBYyxDQUFDTixNQUFNLENBQUM7TUFDMUQsTUFBTU8sU0FBUyxHQUFHQyxJQUFJLENBQUNDLElBQUksQ0FBQ0osU0FBUyxHQUFHTixLQUFLLENBQUM7TUFFOUMsSUFBSVEsU0FBUyxHQUFHVCxJQUFJLEVBQUU7UUFDcEJNLE1BQU0sR0FBRyxDQUFDO1FBQ1ZOLElBQUksR0FBRyxDQUFDO01BQ1Y7TUFFQSxNQUFNWSxRQUFRLEdBQUc7UUFDZlosSUFBSTtRQUNKUyxTQUFTO1FBQ1RSLEtBQUs7UUFDTE07TUFDRixDQUFDO01BRUQsTUFBTU0sTUFBTSxHQUFHLE1BQU12QixXQUFXLENBQUNPLFlBQVksQ0FDM0NJLEtBQUssRUFDTEssTUFBTSxFQUNOSixNQUFNLEVBQ05DLElBQUksQ0FDTDtNQUVELElBQUlVLE1BQU0sQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyQixPQUFPdEIsYUFBYSxDQUFDdUIsUUFBUSxDQUFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRyxrQkFBaUIsRUFBRSxFQUFFLENBQUM7TUFDakU7TUFFQSxPQUFPUCxhQUFhLENBQUN1QixRQUFRLENBQzNCaEIsR0FBRyxFQUNILEdBQUcsRUFDSCxrQkFBa0IsRUFDbEJjLE1BQU0sRUFDTkQsUUFBUSxDQUNUO0lBQ0gsQ0FBQyxDQUFDLE9BQU9JLEtBQUssRUFBRTtNQUNkLE9BQU94QixhQUFhLENBQUN1QixRQUFRLENBQzNCaEIsR0FBRyxFQUNILEdBQUcsRUFDRixnQkFBZWlCLEtBQUssQ0FBQ0MsT0FBUSxHQUFFLEVBQ2hDLElBQUksQ0FDTDtJQUNIO0VBQ0YsQ0FBQztFQUVEQyxVQUFVLEVBQUUsT0FBT3BCLEdBQUcsRUFBRUMsR0FBRyxLQUFLO0lBQzlCLElBQUk7TUFDRixNQUFNO1FBQ0pvQixPQUFPO1FBQ1BDLFdBQVc7UUFDWEMsYUFBYTtRQUNiQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsVUFBVTtRQUNWQyxFQUFFO1FBQ0ZDLFFBQVE7UUFDUkMsT0FBTztRQUNQQztNQUNGLENBQUMsR0FBRzlCLEdBQUcsQ0FBQytCLElBQUk7TUFDWixNQUFNQyxPQUFPLEdBQUc7UUFDZEMsRUFBRSxFQUFFckMsTUFBTSxFQUFFO1FBQ1p5QixPQUFPO1FBQ1BDLFdBQVc7UUFDWEMsYUFBYTtRQUNiQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsVUFBVTtRQUNWQyxFQUFFO1FBQ0ZDLFFBQVE7UUFDUkMsT0FBTztRQUNQQztNQUNGLENBQUM7TUFDRCxNQUFNZixNQUFNLEdBQUcsTUFBTXZCLFdBQVcsQ0FBQzRCLFVBQVUsQ0FBQ1ksT0FBTyxDQUFDO01BQ3BELE9BQU90QyxhQUFhLENBQUN1QixRQUFRLENBQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFYyxNQUFNLENBQUM7SUFDdkUsQ0FBQyxDQUFDLE9BQU9HLEtBQUssRUFBRTtNQUNkLE9BQU94QixhQUFhLENBQUN1QixRQUFRLENBQzNCaEIsR0FBRyxFQUNILEdBQUcsRUFDRixnQkFBZWlCLEtBQUssQ0FBQ0MsT0FBUSxHQUFFLEVBQ2hDLElBQUksQ0FDTDtJQUNIO0VBQ0Y7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUVGLENBQUMifQ==