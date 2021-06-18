import http from 'http';
import express from 'express';
import multer from 'multer';
import path from 'path';

import room from './room';

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

app.post('/uploadAvatar', uploadHandler, (req, res) => {
  const { file } = req;

  res.end(`${uploadsDir}/${file.filename}`);
});

app.use(room);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
