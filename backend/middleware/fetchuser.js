const jwt = require("jsonwebtoken");
const JWT_SECRET = "nasir";

const fetchuser = (req, res, next) => {
  //  Get user form JWT token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please Authenticate with valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate with valid token" });
  }
};

module.exports = fetchuser;
