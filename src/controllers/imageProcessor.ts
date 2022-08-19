import sharp from 'sharp';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
const fileExisits = async (filePath: string): Promise<boolean> => {
  const response = await fs.existsSync(filePath);
  return response;
};
const processImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;
  const f: string = filename as unknown as string;
  const h: number | null = height ? parseInt(height as string, 10) : null;
  const w: number | null = width ? parseInt(width as string, 10) : null;
  const options = {
    root: path.join('./output'),
  };
  const imgPath = `${f}.png`;
  const imageExists = await fileExisits(path.join('./images', imgPath));
  if (imageExists) {
    const resized = await sharp(`images/${imgPath}`)
      .resize(w, h)
      .png()
      .toFile(`output/resized-${f}${w}x${h}.png`);
    res.status(200).sendFile(`resized-${f}${w}x${h}.png`, options, (err) => {
      if (err) console.log(err);
    });
  } else {
    res.status(400).send(`image doesn't exist`);
  }
};
export { processImage };
