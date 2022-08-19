"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessor_1 = require("../controllers/imageProcessor");
const validateParams_1 = __importDefault(require("../middleware/validateParams"));
const router = express_1.default.Router();
router.get('/api/resizeImage', validateParams_1.default, imageProcessor_1.processImage);
exports.default = router;
