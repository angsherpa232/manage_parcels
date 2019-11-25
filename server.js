const express = require("express");
const basicAuth = require("express-basic-auth");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const config = require("./utility/config");

const auth = basicAuth({
  users: config
});

// List of bikers. There's only one manager i.e. john
const bikerList = require("./utility/bikers");
// List of parcels
const parcelArray = require("./utility/parcels");

const PORT = process.env.PORT || 5000;

// A random key for signing the cookie
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));

app
  .use(express.static(path.join(__dirname, "./build")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("/authenticate", auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true
  };

  if (req.auth.user === "john") {
    res.cookie("name", "john", options).send({ screen: "manager" });
  } else if (bikerList.includes(req.auth.user)) {
    res.cookie("name", req.auth.user, options).send({ screen: "biker" });
  }
});

app.get("/read-cookie", (req, res) => {
  if (req.signedCookies.name === "john") {
    res.send({ screen: "manager", name: "john" });
  } else if (bikerList.includes(req.signedCookies.name)) {
    res.send({ screen: "biker", name: req.signedCookies.name });
  } else {
    res.send({ screen: "auth" });
  }
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("name").end();
});

app.get("/get-data", (req, res) => {
  res.json(parcelArray);
});
