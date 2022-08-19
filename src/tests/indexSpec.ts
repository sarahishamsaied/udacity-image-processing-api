import supertest from 'supertest';
import app from '..';

const request = supertest(app);
describe('Testing index.ts', () => {
  it('Should return "Hello World" when api is "/"', async (done) => {
    const response = await request.get('/');
    expect(response.text).toBe('Hello World!');
    done();
  });
});
