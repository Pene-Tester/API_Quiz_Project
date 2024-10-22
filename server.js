const express = require('express');
const path = require('path');

//Routes to Page
const quizRoutes = require('./routes/quizRoutes');
const indexRoute = require('./routes/index');
const aboutRoutes = require('./routes/about');
const historyRoutes = require('./routes/history');


const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

//Use About us Routes
app.use('/about', aboutRoutes);

// Use quiz routes
app.use('/index', indexRoute);

//Use History Routes
app.use('/history', historyRoutes);

// Use quiz routes
app.use('/', quizRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});