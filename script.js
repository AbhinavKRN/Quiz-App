const questions = [
    {
        question: "Which HTML tag is used to define an inline style?",
        answers: [
            { text: "script", correct: false },
            { text: "css", correct: false },
            { text: "style", correct: true },
            { text: "span", correct: false },
        ]
    },
    {
        question: "Which property is used to change the text color in CSS?",
        answers: [
            { text: "text-color", correct: false },
            { text: "font-color", correct: false },
            { text: "text-style", correct: false },
            { text: "color", correct: true },
        ]
    },
    {
        question: "Which of the following is the correct way to comment in HTML?",
        answers: [
            { text: "// Comment", correct: false },
            { text: "!-- Comment --", correct: true },
            { text: "/* Comment */", correct: false },
            { text: "! Comment>", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentIndex];
    let questionNo = currentIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(btn => {
        if (btn !== button) {
            btn.disabled = true;
        }
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
