const express = require("express");

//express ile program ayağa kaldırılır.
const app = express();

//dotenv ile hızlı atama işlemi yapılır
const dotenv = require("dotenv").config();

//template engine ayarları
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
//router
const resim_router = require("./router/resimleri_goster");
const error_router = require("./router/error_router");
const resim_yukle = require("./router/resim_yukle_router");
const login_router = require("./router/account_router");
const profil_router = require("./router/profil_router");

//session işlemleri
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_STRING_LOCAL,
  collection: "sessionlar",
});

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  })
);
app.use(expressLayouts);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

//formdan veri çekmemiz için gerekli olan yer
app.use(express.urlencoded({ extended: true }));

require("./src/config/database.js");

app.listen(process.env.PORT, () => {
  console.log("sunucu " + process.env.PORT + " portunda çalışıyor");
});
app.get("/test", (req, res) => {
  res.json({
    mesaj: "merhaba",
    sayacim: req.session.saya,
    kullanici: req.user,
  });
});
app.use("/", resim_router);
app.use("/", resim_yukle);
app.use("/", login_router);
app.use("/", profil_router);
app.use("*", error_router);
