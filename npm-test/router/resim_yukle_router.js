const router = require("express").Router();
const ImageModel = require("../model/imagemodel");
const multerConfig = require("../src/config/multer_config");
router.post(
  "/upImage",
  multerConfig.single("wp"),
  (req, res) => {
    if (loginControll(req, res)) {
      const etiket = req.body.baslik_adi;
      const model = new ImageModel({
        resim: req.file.filename,
        resim_turu: req.body.baslik,
        username: req.session.username,
        etiket: etiket.split(","),
        explanation: req.body.explanation,
      });
      model.save((err, doc) => {
        if (err){ console.log(err + " hehehehe");
		
		 res.render("error", {
            error: "Bu dosya çok büyük bize mi iş koyuyorsun",
          });}
        else {
          console.log(doc + "hahahaha");
          res.render("error", {
            error: "Bu dosya çok büyük bize mi iş koyuyorsun",
          });
        }
      });
      res.redirect("/images");
    }
  },
  (error, req, res, next) => {
    if (loginControll(req, res)) {
    
      if (error) {
        console.log(error + "bu hata buradan geliyor"); 
        res.render("error", { error: "Portal silahınız kırılmış olmalı" });

        if (error == "MulterError: File too large")
          res.render("error", {
            error: "Bu dosya çok büyük bize mi iş koyuyorsun",
          });
        res.render("error", { error: "Portal silahınız kırılmış olmalı" });
      } else {
        res.redirect("/images");
      }
    }
  }
);
router.get("/upImage", async (req, res) => {
  if (loginControll(req, res)) {
    res.render("resim_yukle");
  }
});
function loginControll(req, res) {
  if (req.session.username) return true;
  return res.redirect("/");
}
module.exports = router;
