const express = require('express');
const router = express.Router();
const quizRoutes = require('./quizRoutes');

router.get('/', (req, res) => {
  res.render('landing', { title: 'Home' });
});

module.exports = router;