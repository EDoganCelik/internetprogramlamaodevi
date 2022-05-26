const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((hata) => console.log(`veritabanı baglantı hatası ${hata}`));
