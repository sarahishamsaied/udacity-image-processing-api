import sharp from 'sharp';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
const fileExisits = async (filePath: string): Promise<boolean> => {
  const response = await fs.existsSync(filePath);
  return response;
};
export const resizeImage = async (
  imgPath: string,
  w: number,
  h: number,
  f: string
): Promise<void> => {
  try {
    await sharp(`images/${imgPath}`)
      .resize(w, h)
      .png()
      .toFile(`output/resized-${f}${w}x${h}.png`);
  } catch (err) {
    console.log('Invalid parameters');
  }
};
const processImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;
    const f: string = filename as unknown as string;
    const h: number | null = height ? parseInt(height as string, 10) : null;
    const w: number | null = width ? parseInt(width as string, 10) : null;
    const options = {
      root: path.join('./output'),
    };
    const imgPath = `${f}.png`;
    const resizedImg = `resized-${f}${w}x${h}.png`;
    const imageExists = await fileExisits(path.join('./images', imgPath));
    const resizedImgExists = await fileExisits(
      path.join('./output', resizedImg)
    );
    if (resizedImgExists) {
      res.status(400).send('Image is already processed');
      return;
    }
    if (imageExists) {
      await resizeImage(imgPath, w as number, h as number, f);
      res.status(200).sendFile(`resized-${f}${w}x${h}.png`, options, (err) => {
        if (err) console.log(err);
      });
    } else {
      res.status(400).send(`image doesn't exist`);
    }
  } catch (e) {
    res.status(500).send('there was an error processing your request');
    console.log(e);
  }
};
export const cashedPaths = (req: Request, res: Response): void => {
  const directory = 'output';
  const data = fs.readdirSync(directory);
  const cache = data.map((d) => {
    return `http://localhost:3000/${d}`;
  });
  res.status(200).send({
    cache,
  });
};
export { processImage };
