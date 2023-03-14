const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userlog = verify;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
