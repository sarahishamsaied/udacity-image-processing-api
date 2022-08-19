"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileExisits = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fs_1.default.existsSync(filePath);
    return response;
});
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    const f = filename;
    const h = height ? parseInt(height, 10) : null;
    const w = width ? parseInt(width, 10) : null;
    const options = {
        root: path_1.default.join('./output'),
    };
    const imgPath = `${f}.png`;
    const imageExists = yield fileExisits(path_1.default.join('./images', imgPath));
    console.log('does exist:', imageExists);
    if (imageExists) {
        const resized = yield (0, sharp_1.default)(`images/${imgPath}`)
            .resize(w, h)
            .png()
            .toFile(`output/resized-${f}${w}x${h}.png`);
        res.status(200).sendFile(`resized-${f}${w}x${h}.png`, options, (err) => {
            if (err)
                console.log(err);
        });
    }
    else {
        res.status(400).send(`image doesn't exist`);
    }
});
exports.processImage = processImage;
