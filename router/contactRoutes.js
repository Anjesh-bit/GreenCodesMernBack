const express = require('express');
const router = express.Router();

const { GreenContactFindAll, GreenContact, GreenContactFindById, GreenContactDelete, GreenContactUpdate } = require('../controllers/contactController');
router.route("/addcontact")
    .post(GreenContact)
router.route("/allcontacts").get(GreenContactFindAll);
router.route("/:id")
    .get(GreenContactFindById)
    .delete(GreenContactDelete)
    .put(GreenContactUpdate)
module.exports = router;