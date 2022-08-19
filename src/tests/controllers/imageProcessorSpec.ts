import supertest from 'supertest';
import app from '../..';

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
    expect(response.text).toBe('Invalid Parameter(s)');
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
