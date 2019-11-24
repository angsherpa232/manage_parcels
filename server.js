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

// List of bikers. There's only one manager i.e. john
const bikerList = ["user", "ang gurung", "sherpa", "ram", "sam", "kushal"];
// List of parcels
const parcelArray = [
  {
    id: 1,
    assignee: "ang gurung",
    origin: "kathmandu",
    destination: "berlin",
    status: "waiting",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 2,
    assignee: "ang gurung",
    origin: "pokhara",
    destination: "munster",
    status: "waiting",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 3,
    assignee: "sherpa",
    origin: "bhaktapur",
    destination: "freiburg",
    status: "assigned",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 4,
    assignee: "ram",
    origin: "khumbu",
    destination: "frankfurt",
    status: "assinged",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 5,
    assignee: "sam",
    origin: "janakpur",
    destination: "munich",
    status: "pickedUp",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 11,
    assignee: "none",
    origin: "chitwan",
    destination: "america",
    status: "unassigned",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 6,
    assignee: "john",
    origin: "phakding",
    destination: "hamburg",
    status: "pickedUp",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 7,
    assignee: "john",
    origin: "namche",
    destination: "zurich",
    status: "delivered",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 8,
    assignee: "ronay",
    origin: "butwal",
    destination: "spain",
    status: "delivered",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 9,
    assignee: "none",
    origin: "chitwan",
    destination: "america",
    status: "unassigned",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 10,
    assignee: "kushal",
    origin: "lukla",
    destination: "france",
    status: "unassigned",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 12,
    assignee: "sanjeev",
    origin: "chitwan",
    destination: "america",
    status: "delivered",
    pickupTime: "",
    deliveryTime: ""
  },
  {
    id: 13,
    assignee: "sanjeev",
    origin: "chitwan",
    destination: "america",
    status: "pickedUp",
    pickupTime: "",
    deliveryTime: ""
  }
];

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
  res.json(parcelArray);
});
