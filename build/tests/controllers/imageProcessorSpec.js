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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const imageProcessor_1 = require("../../controllers/imageProcessor");
const request = (0, supertest_1.default)(__1.default);
describe('Test Middleware', () => {
    it('should return an error when width is not a number', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/resizeImage?filename=sphere&width=1f00&height=200');
        expect(response.text).toBe('width and height must be numbers');
        done();
    }));
    it('should return an error when width is not a number', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/resizeImage?filename=sphere&width=100&height=20d0');
        expect(response.text).toBe('width and height must be numbers');
        done();
    }));
    it('should return an error when parameter is missing', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/resizeImage');
        expect(response.text).toBe('Missing Parameter(s)');
        done();
    }));
    it('should return an error when width is not a number', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/resizeImage?filename=imagedoesntexist&width=200&height=300');
        expect(response.text).toBe("image doesn't exist");
        expect(response.status).toBe(400);
        done();
    }));
});
describe('Test image processor function', () => __awaiter(void 0, void 0, void 0, function* () {
    it('Should not throw an error when resize image is called', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, imageProcessor_1.resizeImage)('map.png', 100, 100, 'map');
        })).not.toThrow();
        done();
    }));
}));
