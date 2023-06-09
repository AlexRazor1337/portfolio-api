const express = require('express');

const API_PREFIX = '/api';

const authRoutes = require('./auth/auth.router');
const profileRouter = require('./profile/profile.router');
const portfoliosRouter = require('./portfolios/portfolios.router');

const router = express.Router();

router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/profile`, profileRouter);
router.use(`${API_PREFIX}/portfolio`, portfoliosRouter);

module.exports = router;
