const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

console.log(process.env.DB_HOST);
mongoose
  //.connect("mongodb://127.0.0.1:27017/DesarrolloNode") //conectarlo a la base de datos
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log("Conectado");
  })
  .catch((error) => console.log(error));

mongoosePaginate.paginate.options = {
  limit: 1,
};

mongoose.mongoosePaginate = mongoosePaginate;
module.exports = mongoose; // exporta el modulo
