const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};

// const verifyToken = (req, res, next) => {
//   let token = req.headers["authorization"];

//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   if (token.startsWith("Bearer ")) {
//     token = token.slice(7, token.length);
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       console.log(`JWT error: ${err.message}`);
//       return catchError(err, res);
//     }
//     req.user = { user_id: decoded.user_id, role: decoded.role };
//     next();
//   });
// };

let verifyToken = (req, res, next) => {
  let bearerToken = null;
  // check if bearer header exists via API request
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // authorization: bearer token12345
    bearerToken = bearerHeader.split(" ")[1];
  }

  // get cookieToken
  let cookieToken = req.cookies.access_token;

  // set token from bearer header token or cookieToken
  let token = bearerToken || cookieToken;

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      return res.sendStatus(403); // forbidden
    }
    req.token = token;
    req.auth = data;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).send({ message: "Bạn không có quyền hạn cần thiết." });
  }
};

const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === "Employer") {
    next();
  } else {
    res.status(403).send({ message: "Bạn không có quyền hạn cần thiết." });
  }
};

const authJwt = {
  isEmployer,
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
