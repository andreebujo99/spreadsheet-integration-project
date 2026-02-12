import multer from 'multer';
import fs from 'fs';
import path from 'path';

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const allowedMime = [
  'text/csv',

  'application/vnd.ms-excel',

  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const allowedExt = ['.csv', '.xls', '.xlsx'];

export const upload = multer({
  storage,

  fileFilter: (_, file, cb) => {

    const ext = path.extname(file.originalname).toLowerCase();

    const mimeOk = allowedMime.includes(file.mimetype);
    const extOk = allowedExt.includes(ext);

    if (!mimeOk && !extOk) {
      return cb(new Error('Only CSV or Excel files allowed'));
    }

    cb(null, true);
  }
});
