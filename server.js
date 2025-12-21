import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllData } from './core.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/random-user', async (req, res) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер работает: http://localhost:${PORT}`);
});
