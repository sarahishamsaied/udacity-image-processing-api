import { NextFunction, Request, Response } from 'express';

const validateParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { query } = req;
  const params: Array<string> = ['filename', 'height', 'width'];
  for (let i = 0; i < params.length; i++) {
    if (!query[params[i]]) {
      res.status(400).send('Invalid Parameter(s)');
      return;
    } else if (params[i] === 'filename' && typeof params[i] !== 'string') {
      res.status(400).send('Filename must be a string');
      return;
    } else if (params[i] == 'height' || params[i] == 'width') {
      const num = Number(query[params[i]]);
      if (!num) {
        res.status(400).send('width and height must be numbers');
        return;
      }
    }
  }
  next();
};
export default validateParams;
