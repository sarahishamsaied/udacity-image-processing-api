import express from 'express';
import router from './routes/imageRoutes';
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
export default app;
