const express = require('express');
const path = require('path');
const session = require('express-session');
//Routes to Page
const quizRoutes = require('./routes/quizRoutes');
const indexRoute = require('./routes/index');
const aboutRoutes = require('./routes/about');
const historyRoutes = require('./routes/history');
const sessionRoutes = require('./routes/sessionExpired')

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: 'your-secret-key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 0 } // Session expires in 1 minute for demonstration purposes
}));

// Disable caching for all routes (particularly important for the quiz)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
});

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
app.use('/sessionExpired', sessionRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});