const express = require('express');
const router = express.Router();
const axios = require('axios');
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
// Custom quiz route
router.get('/custom', async (req, res) => {
    const { amount, category, difficulty } = req.query;
    const questions = await fetchQuestions(amount, category, difficulty);
    res.render('quiz', { questions: questions });
});

module.exports = router;