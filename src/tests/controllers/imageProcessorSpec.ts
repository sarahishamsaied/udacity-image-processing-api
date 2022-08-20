import supertest from 'supertest';
import app from '../..';
import { resizeImage } from '../../controllers/imageProcessor';
const request = supertest(app);
describe('Test Middleware', () => {
  it('should return an error when width is not a number', async (done) => {
    const response = await request.get(
      '/api/resizeImage?filename=sphere&width=1f00&height=200'
    );
    expect(response.text).toBe('width and height must be numbers');
    done();
  });
  it('should return an error when width is not a number', async (done) => {
    const response = await request.get(
      '/api/resizeImage?filename=sphere&width=100&height=20d0'
    );
    expect(response.text).toBe('width and height must be numbers');
    done();
  });
  it('should return an error when parameter is missing', async (done) => {
    const response = await request.get('/api/resizeImage');
    expect(response.text).toBe('Missing Parameter(s)');
    done();
  });
  it('should return an error when width is not a number', async (done) => {
    const response = await request.get(
      '/api/resizeImage?filename=imagedoesntexist&width=200&height=300'
    );
    expect(response.text).toBe("image doesn't exist");
    expect(response.status).toBe(400);
    done();
  });
});
describe('Test image processor function', async () => {
  it('Should not throw an error when resize image is called', async (done) => {
    expect(async () => {
      await resizeImage('map.png', 100, 100, 'map');
    }).not.toThrow();
    done();
  });
  it('Should return image is already processed', async (done) => {
    const response = await request.get(
      '/api/resizeImage?filename=map&width=310&height=200'
    );
    expect(response.text).toBe('Image is already processed');
    expect(response.status).toBe(400);
    done();
  });
});
