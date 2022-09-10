//jshint esversion:6
require("dotenv").config
const express = require("express");
const ejs = require("ejs");
//const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRound = process.env.SALTROUND;
const app = express();

app.set(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies using querystring library
require("./config")
const User = require("./userModel");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRound, function (err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
          if (result == true) {
            res.render("secrets");
          }
        });
      }
    }
  });
});

app.listen(7000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running at the port");
  }
});
