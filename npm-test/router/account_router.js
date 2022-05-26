const router = require("express").Router();
const UserModel = require("../model/usermodel");
const path = require("path");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

router.get("/", function (req, res) {
  console.log("burada get isteği");
  if (req.session.username) {
    res.redirect("/images");
  } else {
    isView = false;
    res.render("login.ejs", { layout: "./layout/login-layout.ejs",isView });
  }
});
router.post("/", async (req, res) => {
  
    if (req.body.login){
      login(req, res); console.log("test");
    } 
    if (req.body.register){
      register(req, res);
    }  
	  
  
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
async function login(req, res) {
  console.log("test");
  try {
    const model = await UserModel.find({ username: req.body.login }); 
      const validPassword = await bcrypt.compare(
        req.body.password,
        model[0].password
      );
    
    if (validPassword == true&&model[0].password) {
      req.session.username = model[0].username;
      res.redirect("/images");
    } else {
      console.log("buraya ziyaret etti");
      res.redirect("/");
    }
  } catch (error) {
    
  }
 
}
async function register(req, res) {
  
  const model = new UserModel({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.register,
  });
  model.password = await bcrypt.hash(req.body.password, salt);

  model.save((err, doc) => {
    if (err){
      console.log(err);
      isView = true;
      res.render("login.ejs", { layout: "./layout/login-layout.ejs",isView });      //res.redirect("/");
    } 
    else {
    
      console.log(doc + "hahahaha");
      res.redirect("/images");
    }
  });
}

module.exports = router;
