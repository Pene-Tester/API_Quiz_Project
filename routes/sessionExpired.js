const express = require('express');
const router = express.Router();
const quizRoutes = require('./quizRoutes');

router.get('/', (req, res) => {
  res.render('sessionExpired', { title: 'Expired' });
});

module.exports = router;