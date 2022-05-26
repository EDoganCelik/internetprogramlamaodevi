const router = require("express").Router();
const UserModel = require("../model/usermodel");
const multerConfig = require("../src/config/multer_avatar_config");
const ImageModel = require("../model/imagemodel");
 
router.get("/edit-profil", async function (req, res) {
  if (req.session.username) {
    loadEditProfilPage(req, res);
  } else {
    res.redirect("/");
  }
});
router.get("/profil", async function (req, res) {
  const user = req.query.username;
  const models = await UserModel.find({ username: user });

  if (models.length > 0) {
    res.render("profil", { model: models[0] });
  } else if (typeof user === typeof undefined) {
    res.render("profil", {
      model: {
        avatar: "error.gif",
        durum: "Ne yapacağımızı bilemedik",
        hakkinda: "Böyle bir kullanıcı bulunamadı.",
      },
    });
  } else res.redirect("/images");
});
router.post(
  "/edit-profil",
  multerConfig.single("wp"),
  async (req, res) => {
    if(loginControll(req,res)){
      const guncelBilgiler = {};
      if (req.file) {
        guncelBilgiler.avatar = req.file.filename;
      }
      if (req.body.durum) {
        guncelBilgiler.durum = req.body.durum;
      }
      if (req.body.hakkinda) {
        guncelBilgiler.hakkinda = req.body.hakkinda;
      }
      const sonuc = await UserModel.findOneAndUpdate(
        { username: req.session.username },
        guncelBilgiler,
        {
          //options
          returnNewDocument: true,
          new: true,
          strict: false,
        }
      );
      const imageModels = await ImageModel.find({username: req.session.username });
      res.render("edit-profil", { model: sonuc ,models:imageModels});
    }
  },
  async (error, req, res, next) => {
    if(loginControll(req,res)){
      if (error) {
        if (error == "MulterError: File too large")
          res.render("error", {
            error: "Bu dosya çok büyük bize mi iş koyuyorsun",
          });
        res.render("error", {
          error:
            "Portal silahınız kırılmış olmalı<br/>Lütfen doğru şeyler yapınız tşk.",
        });
      } else {
        res.redirect("/edit-profil");
      }
    }
  }
);
async function loadEditProfilPage(req, res) {
  console.log(req.session.username);
  const models = await UserModel.find({ username: req.session.username });
  const imageModels = await ImageModel.find({username: req.session.username });

  res.render("edit-profil", { model: models[0] ,models:imageModels});
}
function loginControll(req,res) {
  if(req.session.username) return true;
  return res.redirect("/");
}
module.exports = router;
