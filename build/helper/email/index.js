const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();
const sendMail = data => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP,
      pass: process.env.PASS_SMTP
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.use("compile", hbs({
    viewEngine: {
      extname: ".html",
      partialsDir: path.resolve("./src/templates/email"),
      defaultLayout: false
    },
    viewPath: path.resolve("./src/templates/email"),
    extName: ".html"
  }));
  const mailOptions = {
    from: '"Tickitz Movie" <exampleemail581@gmail.com',
    to: data.to,
    subject: data.subject,
    template: data.template,
    context: data.data
  };
  if (data.attachment) {
    if (data.attachment.length > 0) {
      mailOptions.attachment = data.attachment;
    }
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      reject(error);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Email sent ! ${info.response}`);
      resolve(info.response);
    }
  });
  // eslint-disable-next-line no-console
  console.log("SEND MAIL PROCESS WORKS!");
});
module.exports = sendMail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJub2RlbWFpbGVyIiwicmVxdWlyZSIsImhicyIsInBhdGgiLCJjb25maWciLCJzZW5kTWFpbCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRyYW5zcG9ydGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJIT1NUX1NNVFAiLCJwb3J0IiwiUE9SVF9TTVRQIiwic2VjdXJlIiwiYXV0aCIsInVzZXIiLCJFTUFJTF9TTVRQIiwicGFzcyIsIlBBU1NfU01UUCIsInRscyIsInJlamVjdFVuYXV0aG9yaXplZCIsInVzZSIsInZpZXdFbmdpbmUiLCJleHRuYW1lIiwicGFydGlhbHNEaXIiLCJkZWZhdWx0TGF5b3V0Iiwidmlld1BhdGgiLCJleHROYW1lIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwidGVtcGxhdGUiLCJjb250ZXh0IiwiYXR0YWNobWVudCIsImxlbmd0aCIsImVycm9yIiwiaW5mbyIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVyL2VtYWlsL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVtYWlsZXIgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTtcclxuY29uc3QgaGJzID0gcmVxdWlyZShcIm5vZGVtYWlsZXItZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcbnJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XHJcblxyXG5jb25zdCBzZW5kTWFpbCA9IChkYXRhKSA9PlxyXG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICBob3N0OiBwcm9jZXNzLmVudi5IT1NUX1NNVFAsXHJcbiAgICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlRfU01UUCxcclxuICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgYXV0aDoge1xyXG4gICAgICAgIHVzZXI6IHByb2Nlc3MuZW52LkVNQUlMX1NNVFAsXHJcbiAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuUEFTU19TTVRQLFxyXG4gICAgICB9LFxyXG4gICAgICB0bHM6IHtcclxuICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJhbnNwb3J0ZXIudXNlKFxyXG4gICAgICBcImNvbXBpbGVcIixcclxuICAgICAgaGJzKHtcclxuICAgICAgICB2aWV3RW5naW5lOiB7XHJcbiAgICAgICAgICBleHRuYW1lOiBcIi5odG1sXCIsXHJcbiAgICAgICAgICBwYXJ0aWFsc0RpcjogcGF0aC5yZXNvbHZlKFwiLi9zcmMvdGVtcGxhdGVzL2VtYWlsXCIpLFxyXG4gICAgICAgICAgZGVmYXVsdExheW91dDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3UGF0aDogcGF0aC5yZXNvbHZlKFwiLi9zcmMvdGVtcGxhdGVzL2VtYWlsXCIpLFxyXG4gICAgICAgIGV4dE5hbWU6IFwiLmh0bWxcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgIGZyb206ICdcIlRpY2tpdHogTW92aWVcIiA8ZXhhbXBsZWVtYWlsNTgxQGdtYWlsLmNvbScsXHJcbiAgICAgIHRvOiBkYXRhLnRvLFxyXG4gICAgICBzdWJqZWN0OiBkYXRhLnN1YmplY3QsXHJcbiAgICAgIHRlbXBsYXRlOiBkYXRhLnRlbXBsYXRlLFxyXG4gICAgICBjb250ZXh0OiBkYXRhLmRhdGEsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkYXRhLmF0dGFjaG1lbnQpIHtcclxuICAgICAgaWYgKGRhdGEuYXR0YWNobWVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWFpbE9wdGlvbnMuYXR0YWNobWVudCA9IGRhdGEuYXR0YWNobWVudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCAoZXJyb3IsIGluZm8pID0+IHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBFbWFpbCBzZW50ICEgJHtpbmZvLnJlc3BvbnNlfWApO1xyXG4gICAgICAgIHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgIGNvbnNvbGUubG9nKFwiU0VORCBNQUlMIFBST0NFU1MgV09SS1MhXCIpO1xyXG4gIH0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRNYWlsO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUN4QyxNQUFNQyxHQUFHLEdBQUdELE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztBQUNwRCxNQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDNUJBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQ0csTUFBTSxFQUFFO0FBRTFCLE1BQU1DLFFBQVEsR0FBSUMsSUFBSSxJQUNwQixJQUFJQyxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFQyxNQUFNLEtBQUs7RUFDL0IsTUFBTUMsV0FBVyxHQUFHVixVQUFVLENBQUNXLGVBQWUsQ0FBQztJQUM3Q0MsSUFBSSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUztJQUMzQkMsSUFBSSxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csU0FBUztJQUMzQkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRVAsT0FBTyxDQUFDQyxHQUFHLENBQUNPLFVBQVU7TUFDNUJDLElBQUksRUFBRVQsT0FBTyxDQUFDQyxHQUFHLENBQUNTO0lBQ3BCLENBQUM7SUFDREMsR0FBRyxFQUFFO01BQ0hDLGtCQUFrQixFQUFFO0lBQ3RCO0VBQ0YsQ0FBQyxDQUFDO0VBRUZmLFdBQVcsQ0FBQ2dCLEdBQUcsQ0FDYixTQUFTLEVBQ1R4QixHQUFHLENBQUM7SUFDRnlCLFVBQVUsRUFBRTtNQUNWQyxPQUFPLEVBQUUsT0FBTztNQUNoQkMsV0FBVyxFQUFFMUIsSUFBSSxDQUFDSyxPQUFPLENBQUMsdUJBQXVCLENBQUM7TUFDbERzQixhQUFhLEVBQUU7SUFDakIsQ0FBQztJQUNEQyxRQUFRLEVBQUU1QixJQUFJLENBQUNLLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztJQUMvQ3dCLE9BQU8sRUFBRTtFQUNYLENBQUMsQ0FBQyxDQUNIO0VBRUQsTUFBTUMsV0FBVyxHQUFHO0lBQ2xCQyxJQUFJLEVBQUUsNENBQTRDO0lBQ2xEQyxFQUFFLEVBQUU3QixJQUFJLENBQUM2QixFQUFFO0lBQ1hDLE9BQU8sRUFBRTlCLElBQUksQ0FBQzhCLE9BQU87SUFDckJDLFFBQVEsRUFBRS9CLElBQUksQ0FBQytCLFFBQVE7SUFDdkJDLE9BQU8sRUFBRWhDLElBQUksQ0FBQ0E7RUFDaEIsQ0FBQztFQUVELElBQUlBLElBQUksQ0FBQ2lDLFVBQVUsRUFBRTtJQUNuQixJQUFJakMsSUFBSSxDQUFDaUMsVUFBVSxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQzlCUCxXQUFXLENBQUNNLFVBQVUsR0FBR2pDLElBQUksQ0FBQ2lDLFVBQVU7SUFDMUM7RUFDRjtFQUVBN0IsV0FBVyxDQUFDTCxRQUFRLENBQUM0QixXQUFXLEVBQUUsQ0FBQ1EsS0FBSyxFQUFFQyxJQUFJLEtBQUs7SUFDakQsSUFBSUQsS0FBSyxFQUFFO01BQ1RoQyxNQUFNLENBQUNnQyxLQUFLLENBQUM7SUFDZixDQUFDLE1BQU07TUFDTDtNQUNBRSxPQUFPLENBQUNDLEdBQUcsQ0FBRSxnQkFBZUYsSUFBSSxDQUFDRyxRQUFTLEVBQUMsQ0FBQztNQUM1Q3JDLE9BQU8sQ0FBQ2tDLElBQUksQ0FBQ0csUUFBUSxDQUFDO0lBQ3hCO0VBQ0YsQ0FBQyxDQUFDO0VBQ0Y7RUFDQUYsT0FBTyxDQUFDQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBQ0pFLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHMUMsUUFBUSJ9