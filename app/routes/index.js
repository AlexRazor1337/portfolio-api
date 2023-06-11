const express = require('express');

const authRoutes = require('./auth/auth.router');
const profileRouter = require('./profile/profile.router');
const portfoliosRouter = require('./portfolios/portfolios.router');
const imagesRouter = require('./images/images.router');
const commentsRouter = require('./comments/comments.router');
const feedRouter = require('./feed/feed.router');

const API_PREFIX = '/api';

const router = express.Router();

router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/profile`, profileRouter);
router.use(`${API_PREFIX}/portfolio`, portfoliosRouter);
router.use(`${API_PREFIX}/images`, imagesRouter);
router.use(`${API_PREFIX}/comments`, commentsRouter);
router.use(`${API_PREFIX}/feed`, feedRouter);

module.exports = router;
