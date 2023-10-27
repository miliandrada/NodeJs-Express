const mongoose = require("../config/mongodb");
const errorMessage = require("../utils/errorMessages");

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  price: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: [0, errorMessage.GENERAL.minLength], // 1ro valor elemento un valor (campo >0), 2do mensaje
    get: function (value) {
      return value * 1.21;
    },
  },
  description: String,
  quantity: Number,
  status: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
  },
  destacado: Boolean,
});

productsSchema.virtual("price_currency").get(function () {
  return `$ ${this.price}`;
});

productsSchema.set("toJSON", { getters: true, setters: true, virtuals: true });
productsSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model("productos", productsSchema);
