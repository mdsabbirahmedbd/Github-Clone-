const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.patch("/follow/:id", authMiddleware,  userController.followUser);
router.patch("/unfollow/:id", authMiddleware, userController.unFollow);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.get("/logout", authMiddleware, userController.logout);

module.exports = router;
