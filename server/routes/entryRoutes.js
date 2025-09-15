const express = require('express');
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/entryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/')
  .get(getEntries)
  .post(createEntry);

router.route('/:id')
  .patch(updateEntry)
  .delete(deleteEntry);

module.exports = router;