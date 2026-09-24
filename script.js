const questions = [
    {
        question: "भारत की राजधानी क्या है?",
        options: [
            "मुंबई",
            "नई दिल्ली",
            "कोलकाता",
            "चेन्नई"
        ],
        correct: 1,
        explanation: "भारत की राजधानी नई दिल्ली है।"
    },

    {
        question: "जल का रासायनिक सूत्र क्या है?",
        options: [
            "CO₂",
            "O₂",
            "H₂O",
            "NaCl"
        ],
        correct: 2,
        explanation: "जल का रासायनिक सूत्र H₂O है।"
    },

    {
        question: "2 + 2 × 3 का सही उत्तर क्या है?",
        options: [
            "12",
            "10",
            "8",
            "6"
        ],
        correct: 2,
        explanation: "BODMAS के अनुसार पहले गुणा होगा: 2 × 3 = 6, फिर 2 + 6 = 8।"
    }
];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");


function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumberElement.textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    scoreElement.textContent =
        "Score: " + score;

    questionElement.textContent =
        question.question;

    optionsElement.innerHTML = "";

    feedbackElement.innerHTML = "";
    feedbackElement.style.display = "none";

    nextButton.hidden = true;


    question.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.className = "option";
        button.type = "button";
        button.textContent = option;

        button.addEventListener("click", function() {
            selectAnswer(index);
        });

        optionsElement.appendChild(button);
    });
}


function selectAnswer(selectedIndex) {

    if (answered === true) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(function(button, index) {

        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }
    });


    if (selectedIndex === question.correct) {

        score = score + 1;

        feedbackElement.innerHTML =
            "<strong>✓ Correct!</strong><br><br>" +
            "<strong>Explanation:</strong> " +
            question.explanation;

    } else {

        buttons[selectedIndex].classList.add("wrong");

        feedbackElement.innerHTML =
            "<strong>✗ Wrong!</strong><br><br>" +
            "<strong>Correct answer:</strong> " +
            question.options[question.correct] +
            "<br><br>" +
            "<strong>Explanation:</strong> " +
            question.explanation;
    }


    scoreElement.textContent =
        "Score: " + score;

    feedbackElement.style.display = "block";

    nextButton.hidden = false;
}


nextButton.addEventListener("click", function() {

    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});


function showResult() {

    const total = questions.length;

    const percentage =
        Math.round((score / total) * 100);


    document.querySelector(".quiz-card").innerHTML =

        "<div style='text-align:center;'>" +

        "<h2>Quiz Complete 🎉</h2>" +

        "<h3>Score: " +
        score +
        " / " +
        total +
        "</h3>" +

        "<p>Accuracy: " +
        percentage +
        "%</p>" +

        "<button " +
        "class='next-button' " +
        "id='restart-button'>" +
        "Try Again" +
        "</button>" +

        "</div>";


    document
        .getElementById("restart-button")
        .addEventListener("click", function() {

            location.reload();

        });
}


showQuestion();
