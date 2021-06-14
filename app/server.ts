import http from 'http';
import express from 'express';
import multer from 'multer';
import path from 'path';

import websocket from './websocket';

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

const uploadsDir = 'uploads';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, uploadsDir),
  filename(req, file, cb) {
    const { originalname } = file;
    const extension = originalname.slice(originalname.lastIndexOf('.'));
    const hash = Math.random().toString(36).slice(2);
    cb(null, `${hash}${extension}`);
  },
});

const uploadHandler = multer({ storage }).single('file');

app.use(express.static(path.resolve(__dirname, 'public/')));
app.use('/' + uploadsDir, express.static(path.resolve(__dirname, uploadsDir)));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

app.post('/uploadAvatar', uploadHandler, (req, res) => {
  const { file } = req;

  res.end(`${uploadsDir}/${file.filename}`);
});

app.get('/room', (req, res) => {
  console.log(`someone entered the room: ${req.query.id}`);
  res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

app.use(websocket);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
