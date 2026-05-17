const express = require("express");
const router = express.Router();
const repoController = require("../controllers/repoController");
const authMiddleware = require("../middleware/auth");

router.get("/",authMiddleware, repoController.getAllRepositoris);
router.post("/create", authMiddleware, repoController.createRepositiory);
router.get("/myrepo", authMiddleware, repoController.getRepositoryByEmail);
module.exports = router;