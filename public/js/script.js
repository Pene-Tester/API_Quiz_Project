document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quizForm');
    const modal = document.getElementById('scoreModal');
    const closeButton = document.querySelector('.close-button');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const detailedResults = document.getElementById('detailedResults');
    const reviewAnswersButton = document.getElementById('reviewAnswers');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retryQuiz'); // Retry button
    const questionBlocks = document.querySelectorAll('.question-block');
  
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
  
    // Function to show specific question by index
    function showQuestion(index) {
        questionBlocks.forEach((block, i) => {
            block.style.display = i === index ? 'block' : 'none';
        });
    }
  
    // Initialize first question to be visible
    showQuestion(0);
  
    // Add event listeners for "Next" and "Back" buttons
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentIndex = parseInt(e.target.getAttribute('data-index'));
            showQuestion(currentIndex + 1);
        });
    });
  
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentIndex = parseInt(e.target.getAttribute('data-index'));
            showQuestion(currentIndex - 1);
        });
    });
  
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
  
            let score = 0;
            let userAnswers = [];
  
            questionBlocks.forEach((block, index) => {
                const correctAnswer = decodeHtml(block.getAttribute('data-correct'));
                const selectedInput = document.querySelector(`input[name="question${index}"]:checked`);
  
                if (selectedInput) {
                    const selectedAnswer = decodeHtml(selectedInput.value);
                    const questionText = decodeHtml(block.querySelector('h2').textContent.replace(`Question ${index + 1}: `, ''));
  
                    userAnswers.push({
                        question: questionText,
                        userAnswer: selectedAnswer,
                        correctAnswer: correctAnswer,
                        isCorrect: selectedAnswer === correctAnswer
                    });
  
                    if (selectedAnswer === correctAnswer) {
                        score++;
                    }
                }
            });
  
            const percentage = Math.round((score / questionBlocks.length) * 100);
  
            scoreDisplay.innerHTML = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div class="score-number">${percentage}%</div>
                    <div class="score-text">You got ${score} out of ${questionBlocks.length} questions correct!</div>
                </div>
            `;
  
            modal.style.display = 'block';
  
            if (reviewAnswersButton) {
                reviewAnswersButton.addEventListener('click', function() {
                    detailedResults.style.display = 'block';
                    detailedResults.innerHTML = userAnswers.map((answer, index) => `
                        <div class="result-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
                            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
                            <p>Your answer: ${answer.userAnswer} 
                                ${answer.isCorrect ? 
                                    '<span class="check-mark">✓</span>' : 
                                    `<span class="cross-mark">✗</span><br>Correct answer: ${answer.correctAnswer}` }
                            </p>
                        </div>
                    `).join('');
                });
            }
        });
    }
  
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
  
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Retry Quiz functionality - Navigate back to quiz setup (home page or category/number of questions selection)
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            // Hide the modal
            modal.style.display = 'none';

            // Redirect to quiz setup page (adjust URL if your quiz setup is on a different route)
            window.location.href = '/index'; // Assuming the quiz setup form is at the root ("/")
        });
    }
  
   
});
