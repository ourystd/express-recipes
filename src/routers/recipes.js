const auth = require("../middleware/auth");
const express = require("express");
const {
  getAll,
  save,
  getDetails,
  remove,
  update,
} = require("../controllers/recipes");

const router = express.Router();

router.route("/").get(getAll).post(auth.authenticate(), save);
router
  .route("/:id")
  .get(getDetails)
  .put(auth.authenticate(), update)
  .delete(auth.authenticate(), remove);

module.exports = router;
