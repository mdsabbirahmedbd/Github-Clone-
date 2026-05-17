const router = require("express").Router();
const socialController = require("../controllers/SociaController");
const authMiddleware = require("../middleware/auth");
router.get("/get", authMiddleware, socialController.GetPost);
router.post("/create", authMiddleware, socialController.AddPost);
router.patch("/update/:id", authMiddleware, socialController.UpdatePost);
router.delete("/delete/:id",authMiddleware, socialController.DeletePost);
module.exports = router