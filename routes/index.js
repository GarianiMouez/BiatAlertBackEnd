var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/users", require("./users"));
router.use("/t24", require("./t24"));
router.use("/quantara", require("./quantara"));
router.use("/mybiat", require("./mybiat"));

module.exports = router;
