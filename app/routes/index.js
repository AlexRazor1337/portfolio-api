const express = require('express');

const API_PREFIX = '/api';

const authRoutes = require('./auth/auth.router');
const profileRouter = require('./profile/profile.router');

const router = express.Router();

router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/profile`, profileRouter);

module.exports = router;
