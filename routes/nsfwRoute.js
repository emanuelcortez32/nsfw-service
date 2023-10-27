const express = require('express');
const { analyzeImage } = require('../service/nsfwImageDetectionService');
const { uploaderFileMiddleware } = require('../middleware/uploaderFileMiddleware');
const { nsfwController } = require('../controller/nsfwController');

const router = express.Router();


router.post('/detect', uploaderFileMiddleware, nsfwController);

module.exports = router;