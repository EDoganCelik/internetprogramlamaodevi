const multer = require("multer");
const path = require("path");
const imageStorage = multer.diskStorage({
  // Dosyaları saklayacak yeri belirleyelim
  destination: "public/img",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
   
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // Dosyanın saklanacak maksimum limitini belirleyelim DB Şişmesin bunun için kullanıcıyı uyaralım
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
      // Yüklenebilecek dosya türlerini belirleyelim
      return cb(new Error("Bize mi iş koyuyorsun bunlar resim değil"));
    }
    cb(undefined, true);
  },
});

module.exports = imageUpload;
