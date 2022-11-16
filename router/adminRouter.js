const express = require('express');
const router = express.Router();
const { GreenAdminRegistration, GreenAdminLogin } = require('../controllers/adminController');

router.route("/registration")
    .post(GreenAdminRegistration);
router.route("/login")
    .post(GreenAdminLogin);
module.exports = router;