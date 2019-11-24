const express = require("express");
const basicAuth = require("express-basic-auth");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const auth = basicAuth({
  users: {
    john: "1",
    user: "4",
    sherpa: "4",
    ram: "4",
    sam: "4",
    kushal: "4"
  }
});

const bikerList = ["user", "ang gurung", "sherpa", "ram", "sam", "kushal"];

const PORT = process.env.PORT || 5000;

// A random key for signing the cookie
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));

app
  .use(express.static(path.join(__dirname, "./client/build")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
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
    res.send({ screen: "manager" });
  } else if (bikerList.includes(req.signedCookies.name)) {
    res.send({ screen: "biker" });
  } else {
    res.send({ screen: "auth" });
  }
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("name").end();
});

app.get("/get-data", (req, res) => {
  if (req.signedCookies.name === "john") {
    res.send("this is admin panel");
  } else if (req.signedCookies.name === "user") {
    res.send("This is user data");
  } else {
    res.end();
  }
});
