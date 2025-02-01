const quizData = [
    {
        question: "What is the main goal of skiing?",
        answers: [
            { text: "To climb uphill", correct: false },
            { text: "To glide downhill", correct: true },
            { text: "To do flips in the air", correct: false },
            { text: "To build endurance", correct: false }
        ]
    },
    {
        question: "Which type of skiing is performed on groomed slopes?",
        answers: [
            { text: "Cross-country skiing", correct: false },
            { text: "Alpine skiing", correct: true },
            { text: "Freestyle skiing", correct: false },
            { text: "Backcountry skiing", correct: false }
        ]
    },
    {
        question: "What is the purpose of ski wax?",
        answers: [
            { text: "To improve grip and glide", correct: true },
            { text: "To protect skis from scratches", correct: false },
            { text: "To prevent skis from breaking", correct: false },
            { text: "To make skis heavier", correct: false }
        ]
    },
    {
        question: "What is the name of the skiing equipment used to secure your boots to the skis?",
        answers: [
            { text: "Ski poles", correct: false },
            { text: "Ski bindings", correct: true },
            { text: "Ski wax", correct: false },
            { text: "Ski edges", correct: false }
        ]
    },
    {
        question: "Which skiing discipline includes tricks, jumps, and aerials?",
        answers: [
            { text: "Freestyle skiing", correct: true },
            { text: "Alpine skiing", correct: false },
            { text: "Cross-country skiing", correct: false },
            { text: "Backcountry skiing", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timer;
const timeLimit = 10; // 10 seconds per question
let timeRemaining = timeLimit;

// DOM Elements
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultsContainer = document.getElementById("results-container");
const finalScoreElement = document.getElementById("final-score");
const reviewElement = document.getElementById("review");
const retryButton = document.getElementById("retry-btn");

// Timer Element
const timerElement = document.createElement("p");
timerElement.id = "timer";
questionContainer.insertBefore(timerElement, answersElement);

// Progress Bar Elements
const progressContainer = document.createElement("div");
progressContainer.id = "progress-container";
const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
progressContainer.appendChild(progressBar);
questionContainer.insertBefore(progressContainer, questionElement);

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsContainer.style.display = "none";
    restartButton.style.display = "none";
    questionContainer.style.display = "block";
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", () => selectAnswer(button, answer.correct, index));
        answersElement.appendChild(button);
    });

    updateProgressBar();

    // Add fade-in effect
    setTimeout(() => {
        questionContainer.classList.add("show");
    }, 50);

    startTimer();
}


function updateProgressBar() {
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}


// Start the timer
function startTimer() {
    timeRemaining = timeLimit;
    timerElement.textContent = `Time Remaining: ${timeRemaining}s`;

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time Remaining: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Handle timeout (mark question as incorrect and move to next)
function handleTimeOut() {
    const allButtons = document.querySelectorAll(".answer-btn");
    allButtons.forEach(btn => btn.disabled = true);

    const correctButton = Array.from(allButtons).find(btn => btn.dataset.correct === "true");
    if (correctButton) correctButton.classList.add("correct");

    userAnswers[currentQuestionIndex] = { correct: false, selectedIndex: -1 };
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Handle answer selection
function selectAnswer(button, correct, index) {
    clearInterval(timer); // Stop timer once an answer is selected

    userAnswers[currentQuestionIndex] = { correct, selectedIndex: index };
    const allButtons = document.querySelectorAll(".answer-btn");
    allButtons.forEach(btn => btn.disabled = true);

    if (correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
        const correctButton = Array.from(allButtons).find(btn => btn.dataset.correct === "true");
        correctButton.classList.add("correct");
    }

    nextButton.disabled = false;
}

function resetState() {
    nextButton.disabled = true;
    answersElement.innerHTML = "";
    timerElement.textContent = "";
    questionContainer.classList.remove("show"); // Hide before showing the next question
}


function showResults() {
    questionContainer.style.display = "none";
    resultsContainer.style.display = "block";

    finalScoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;

    reviewElement.innerHTML = quizData
        .map((q, i) => {
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer.correct ? "✅" : "❌";
            const selectedText = q.answers[userAnswer.selectedIndex]?.text || "No Answer";
            const correctAnswer = q.answers.find(a => a.correct).text;

            return `
                <div class="review-item">
                    <p><strong>${q.question}</strong></p>
                    <p>Your Answer: ${selectedText} ${isCorrect}</p>
                    <p>Correct Answer: ${correctAnswer}</p>
                </div>
            `;
        })
        .join("");

    setTimeout(() => {
        resultsContainer.classList.add("show"); // Add fade-in effect
    }, 50);
}

// Handle the next button click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Handle the restart button click
restartButton.addEventListener("click", startQuiz);
retryButton.addEventListener("click", startQuiz);

// Initialize the quiz
startQuiz();
