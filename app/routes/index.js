const express = require('express');

const API_PREFIX = '/api';

const authRoutes = require('./auth/auth.router');

const router = express.Router();

router.use(`${API_PREFIX}/auth`, authRoutes);

module.exports = router;
