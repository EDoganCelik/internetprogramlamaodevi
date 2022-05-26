const router = require("express").Router();
const ObjectID = require("mongodb").ObjectId;
const ImageModel = require("../model/imagemodel");
const multerConfig = require("../src/config/multer_config");
const path = require("path");

router.get("/images", async (req, res) => {
  let models;
  loginControlls(req, res, loadMain);
});
router.get("/image", async (req, res) => {
  let models;
  loginControlls(req, res, loadImagePage);
});
router.get("/delete", async (req, res) => {
  loginControlls(req, res, deleteImage);
});
router.post("/image", async (req, res) => {
  loginControlls(req, res, imagePost);
});
async function deleteImage(req, res) {
  const resim_id = req.query.id;
  await ImageModel.findOneAndDelete({ _id: ObjectID(resim_id) }); 
  res.redirect("/edit-profil");
}
async function imagePost(req, res) {
  const resim = req.query.id;
  if (resim.length == 24) {
    models = await ImageModel.find({ _id: ObjectID(resim) });
    if(models!=[])
    likeControl(req, res);
    else
    res.redirect("/images");
  } else {
    res.redirect("/images");
  }
}
async function loadMain(req, res) {
  const resim = req.query.resim;
  const search = req.query.search;
  let models;
  if (resim == "bgs") {
    ImageModel.find({ likeSayisi: { $gte: 0 } })
      .sort([["likeSayisi", "desc"]])
      .limit(100)
      .exec(function (e, data) {
        res.render("main", { models: data });
      });
  }
  if (resim) {
    models = await ImageModel.find({ resim_turu: resim });
    res.render("main", { models: models });
  } else if (search) {
    models = await ImageModel.find({ etiket: { $in: [search] } });
    res.render("main", { models: models, username: req.session.username });
  } else {
    models = await ImageModel.find({ resim_turu: "duvar" });
    res.render("main", { models: models, username: req.session.username });
  }
}
async function loadImagePage(req, res) {
  const resim = req.query.id;
  if (resim.length == 24) {
    models = await ImageModel.find({ _id: ObjectID(resim) });
    res.render("resim", { models: models, username: req.session.username });
  } else {
    res.redirect("/images");
  }
}
function loginControlls(req, res, fonksiyon) {
  if (req.session.username) {
    fonksiyon(req, res);
  } else {
    res.redirect("/");
  }
}

async function likeControl(req, res) {
  const like = req.body.likes;
  const resim = req.query.id;
  const likeControl = typeof like == "undefined" ? false : true;
  let guncelBilgiler;
  if (likeControl) {
    models[0].likes.push(req.session.username);

    guncelBilgiler = {
      likes: models[0].likes,
      likeSayisi: ++models[0].likeSayisi,
    };
    const sonuc = await ImageModel.findOneAndUpdate(
      { _id: ObjectID(resim) },
      guncelBilgiler,
      {
        //options
        returnNewDocument: true,
        new: true,
        strict: false,
      }
    );
    res.redirect("/image?id=" + resim);
  } else {
    models[0].likes.pop(req.session.username);
    guncelBilgiler = {
      likes: models[0].likes,
      likeSayisi: --models[0].likeSayisi,
    };
    const sonuc = await ImageModel.findOneAndUpdate(
      { _id: ObjectID(resim) },
      guncelBilgiler,
      {
        //options
        returnNewDocument: true,
        new: true,
        strict: false,
      }
    );
    res.redirect("/image?id=" + resim);
  }
}
module.exports = router;
