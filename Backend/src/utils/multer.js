const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination: './src/images',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
    },
  }),
});
