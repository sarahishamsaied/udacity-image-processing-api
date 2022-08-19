import express from 'express';
import { processImage } from '../controllers/imageProcessor';
import validateParams from '../middleware/validateParams';
const router = express.Router();
router.get('/api/resizeImage', validateParams, processImage);
export default router;
