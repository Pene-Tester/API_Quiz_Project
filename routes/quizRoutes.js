const express = require('express');
const router = express.Router();
const axios = require('axios');

// Function to fetch quiz questions
async function fetchQuestions(amount = 10, category = '', difficulty = '') {
    try {
        let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
        if (category) url += `&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;

        const response = await axios.get(url);
        return response.data.results.map(q => ({
            question: q.question,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: q.correct_answer
        }));
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

// Home page route
router.get('/', (req, res) => {
    res.render('landing');
});

// Start the quiz route (initialize session)
router.get('/custom', async (req, res) => {
    const { amount, category, difficulty } = req.query;
    
    // Fetch the questions
    const questions = await fetchQuestions(amount, category, difficulty);

    // Initialize the quiz session
    req.session.quizActive = true;
    req.session.questions = questions;

    // Render the quiz page
    res.render('quiz', { questions: questions });
});

// End the quiz session
router.post('/end', (req, res) => {
    // Set session to expire immediately
    req.session.cookie.maxAge = 0;

    // Redirect to a "Session Expired" page
    res.render('sessionExpired'); // Render a special page that shows the session has ended
});

module.exports = router;
