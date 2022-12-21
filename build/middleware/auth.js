const jwt = require("jsonwebtoken");
const helperWrapper = require("../helper/wrapper");
// const redis = require("../config/redis");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return helperWrapper.response(res, 403, "Please login first");
    }
    token = token.split(" ")[1];

    // redis.get(`accessToken:${token}`, (error, result) => {
    //   if (!error && result !== null) {
    //     return helperWrapper.response(
    //       res,
    //       403,
    //       "Your token is destroyed please login again"
    //     );
    //   }

    //   // eslint-disable-next-line no-shadow
    //   jwt.verify(token, "RAHASIA", (error, result) => {
    //     if (error) {
    //       return helperWrapper.response(res, 403, error.message);
    //     }
    //     req.decodeToken = result;
    //     next();
    //   });
    // });
  },

  isAdmin: (req, res, next) => {
    const {
      role
    } = req.decodeToken;
    if (role !== "admin") {
      return helperWrapper.response(res, 400, `Role user must be admin`, null);
    }
    next();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqd3QiLCJyZXF1aXJlIiwiaGVscGVyV3JhcHBlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJhdXRoZW50aWNhdGlvbiIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwicmVzcG9uc2UiLCJzcGxpdCIsImlzQWRtaW4iLCJyb2xlIiwiZGVjb2RlVG9rZW4iXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XHJcbmNvbnN0IGhlbHBlcldyYXBwZXIgPSByZXF1aXJlKFwiLi4vaGVscGVyL3dyYXBwZXJcIik7XHJcbi8vIGNvbnN0IHJlZGlzID0gcmVxdWlyZShcIi4uL2NvbmZpZy9yZWRpc1wiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGF1dGhlbnRpY2F0aW9uOiAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIGxldCB0b2tlbiA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb247XHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKHJlcywgNDAzLCBcIlBsZWFzZSBsb2dpbiBmaXJzdFwiKTtcclxuICAgIH1cclxuICAgIHRva2VuID0gdG9rZW4uc3BsaXQoXCIgXCIpWzFdO1xyXG5cclxuICAgIC8vIHJlZGlzLmdldChgYWNjZXNzVG9rZW46JHt0b2tlbn1gLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xyXG4gICAgLy8gICBpZiAoIWVycm9yICYmIHJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgLy8gICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxyXG4gICAgLy8gICAgICAgcmVzLFxyXG4gICAgLy8gICAgICAgNDAzLFxyXG4gICAgLy8gICAgICAgXCJZb3VyIHRva2VuIGlzIGRlc3Ryb3llZCBwbGVhc2UgbG9naW4gYWdhaW5cIlxyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyAgIH1cclxuXHJcbiAgICAvLyAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcclxuICAgIC8vICAgand0LnZlcmlmeSh0b2tlbiwgXCJSQUhBU0lBXCIsIChlcnJvciwgcmVzdWx0KSA9PiB7XHJcbiAgICAvLyAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShyZXMsIDQwMywgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJlcS5kZWNvZGVUb2tlbiA9IHJlc3VsdDtcclxuICAgIC8vICAgICBuZXh0KCk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfSk7XHJcbiAgfSxcclxuICBpc0FkbWluOiAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIGNvbnN0IHsgcm9sZSB9ID0gcmVxLmRlY29kZVRva2VuO1xyXG4gICAgaWYgKHJvbGUgIT09IFwiYWRtaW5cIikge1xyXG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShyZXMsIDQwMCwgYFJvbGUgdXNlciBtdXN0IGJlIGFkbWluYCwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICBuZXh0KCk7XHJcbiAgfSxcclxufTsiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNuQyxNQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUNsRDs7QUFFQUUsTUFBTSxDQUFDQyxPQUFPLEdBQUc7RUFDZkMsY0FBYyxFQUFFLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEtBQUs7SUFDbEMsSUFBSUMsS0FBSyxHQUFHSCxHQUFHLENBQUNJLE9BQU8sQ0FBQ0MsYUFBYTtJQUNyQyxJQUFJLENBQUNGLEtBQUssRUFBRTtNQUNWLE9BQU9QLGFBQWEsQ0FBQ1UsUUFBUSxDQUFDTCxHQUFHLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixDQUFDO0lBQy9EO0lBQ0FFLEtBQUssR0FBR0EsS0FBSyxDQUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUUzQjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNGLENBQUM7O0VBQ0RDLE9BQU8sRUFBRSxDQUFDUixHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxLQUFLO0lBQzNCLE1BQU07TUFBRU87SUFBSyxDQUFDLEdBQUdULEdBQUcsQ0FBQ1UsV0FBVztJQUNoQyxJQUFJRCxJQUFJLEtBQUssT0FBTyxFQUFFO01BQ3BCLE9BQU9iLGFBQWEsQ0FBQ1UsUUFBUSxDQUFDTCxHQUFHLEVBQUUsR0FBRyxFQUFHLHlCQUF3QixFQUFFLElBQUksQ0FBQztJQUMxRTtJQUNBQyxJQUFJLEVBQUU7RUFDUjtBQUNGLENBQUMifQ==