const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const repoRoutes = require('./repoRoutes');
const socialRoutes = require('./socialRoutes');

router.use('/users', userRoutes);
router.use('/repos', repoRoutes);
router.use('/social',socialRoutes)


module.exports = router;