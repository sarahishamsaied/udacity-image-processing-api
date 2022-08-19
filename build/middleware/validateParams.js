"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParams = (req, res, next) => {
    const { query } = req;
    const params = ['filename', 'height', 'width'];
    for (let i = 0; i < params.length; i++) {
        if (!query[params[i]]) {
            res.status(400).send('Invalid Parameter(s)');
            return;
        }
        else if (params[i] === 'filename' && typeof params[i] !== 'string') {
            res.status(400).send('Filename must be a string');
            return;
        }
        else if (params[i] == 'height' || params[i] == 'width') {
            const num = Number(query[params[i]]);
            if (!num) {
                res.status(400).send('width and height must be numbers');
                return;
            }
        }
    }
    next();
};
exports.default = validateParams;
