const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const researchController = require('../controllers/researchController');

router.post('/postFile', researchController.postFileExcel);
router.post('/', upload.single('image'), researchController.getVocabByStroke);
router.get('/:vocab', researchController.getVocabBySearch)

module.exports = router;
