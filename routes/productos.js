var express = require("express");
var router = express.Router();
const productosController = require("../controllers/productosController");
/* GET users listing. */

router.get("/", productosController.getAll);
router.get("/:id", productosController.getById);
/*router.post(
  "/",
  (req, res, next) => req.app.verifyToken(req, res, next),
  productosController.create
);*/
router.post("/", productosController.create);
router.put("/:id", productosController.update);
router.delete("/:id", productosController.delete);

module.exports = router;
