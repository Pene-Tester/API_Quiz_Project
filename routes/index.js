const express = require('express');
const router = express.Router();

// Route to render index.ejs
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
