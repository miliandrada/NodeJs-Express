const productosModel = require("../models/productosModel");
const categoryModel = require("../models/categoriesModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      // const documents = await productosModel.find(queryFind).populate("category").select("name price").sort({price:-1})
      // const documents = await productosModel
      //.find({ destacado: true })
      //.populate("category")
      //.select("name price")
      // .sort({ price: -1 });
      let queryFind = {};
      if (req.query.buscar) {
        queryFind = {
          name: { $regex: `.*${req.query.buscar}.*`, $options: "i" },
        };
        /* queryFind = {
          $: [{ name: { $regex: `.*${req.query.buscar}.*`, $options: "i" } }], concatenar con $or de mongoose */
      }
      const documents = await productosModel.paginate(queryFind, {
        limit: req.query.limit || 1,
        page: req.query.page || 1,
        populate: "category",
        select: "name price",
        sort: { price: -1 },
      });
      res.status(200).json(documents);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message }); //particular
    }
  },
  getById: async function (req, res, next) {
    try {
      const document = await productosModel.findById(req.params.id);
      res.status(200).json(document);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const category = await categoryModel.findByIdAndValidate(
        req.body.category
      );
      if (category.error) {
        return res.json(category);
      }
      console.log(req.body);
      const document = new productosModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        destacado: req.body.destacado || false,
      });
      const product = await document.save();
      res.status(201).json(product);
    } catch (e) {
      console.log(e);
      // res.status(400).json({message:e.message}) 1ra opcion ERROR HANDLER
      e.status = 400;
      next(e); //2do metodo
    }
  },
  update: async function (req, res, next) {
    try {
      const update = await productosModel.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(update);
    } catch (e) {
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const deleteResponse = await productosModel.deleteOne({
        _id: req.params.id,
      });
      res.status(200).json(deleteResponse);
    } catch (e) {
      next(e);
    }
  },
};
