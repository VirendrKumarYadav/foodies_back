const express = require("express");
const userControle = require("../controllers/user")
const router = express.Router();
const auth = require("../authentication")



router.post("/register", userControle.userRgistration);

router.post("/login", userControle.userLogin);

router.get("/logout", userControle.userLogout);

router.get("/", auth(["admin"]), userControle.getUserID)

router.get("/auth", userControle.getUserAuth)


module.exports = router;