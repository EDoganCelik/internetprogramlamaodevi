const router = require("express").Router();
const path = require("path");

router.get("*", function (req, res) {
  res.render("error", { error: "Portal silahınız kırılmış olmalı" });
});
module.exports = router;