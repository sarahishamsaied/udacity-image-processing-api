import express from 'express';
import { processImage, cashedPaths } from '../controllers/imageProcessor';
import validateParams from '../middleware/validateParams';
const router = express.Router();
router.get('/api/resizeImage', validateParams, processImage);
router.get('/api/cache', cashedPaths);

export default router;
