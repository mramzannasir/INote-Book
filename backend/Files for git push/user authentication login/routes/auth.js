const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { findOne } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Route: 1 Create a User using Post api/auth/user. Doesn't require any login Login doesn't Required
const JWT_SECRET = "nasir";

router.post(
  "/user",
  [
    body("name", "invalid name").isLength({ min: 4 }),
    // email must be an email
    body("email", "enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be 8 charcter").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // fined one use for finding  duplicate emails in data base
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Invalid email this email already exist" });
      }
      // Creating an Hash form of password
      const salt = bcrypt.genSaltSync(10);
      secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      // creating an jsonwebtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // Show your jsonwebtoken in your response json
      res.json(authToken);
    } catch (error) {
      console.error(errer.massege);
      res.status(500).send("Enternal server error");
    }
  }
);

// Route 2: Authentication a user login using: POST 'api/auth/login Login doesn't Required

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "Enter your password").exists(),
  ],
  //If any error: then through bad request
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //  Now we have emial and password we take from req.body now we check for matching email
    try {
      let user = await User.findOne({ email });
      if (!user) {
        // if user doesn't exist then send bad request
        return res.status(400).json({ error: "Enter Correct Email" });
      }

      // Now at this stage we check if user exist its password is matched and we match user password hash \/
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter your Correct Password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.error(error.massege);
      res.status(500).send("Enternal server error");
    }
  }
);


module.exports = router;
