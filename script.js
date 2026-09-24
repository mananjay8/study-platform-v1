const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_URL_HERE";

const SUPABASE_KEY =
    "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// -------------------------
// HTML ELEMENTS
// -------------------------

const examList =
    document.getElementById("exam-list");

const quizSection =
    document.getElementById("quiz-section");

const resultSection =
    document.getElementById("result-section");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("next-button");

const questionNumberElement =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const resultElement =
    document.getElementById("result");

const restartButton =
    document.getElementById("restart-button");


// -------------------------
// QUIZ VARIABLES
// -------------------------

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

let selectedExam = null;


// -------------------------
// LOAD EXAMS
// -------------------------

async function loadExams() {

    examList.textContent =
        "Loading exams...";


    const { data, error } =
        await supabaseClient
            .from("exams")
            .select("*")
            .eq("is_active", true)
            .order("id");


    if (error) {

        console.error(error);

        examList.innerHTML =
            "<p>Exam load नहीं हुआ।</p>";

        return;
    }


    if (!data || data.length === 0) {

        examList.innerHTML =
            "<p>अभी कोई exam available नहीं है।</p>";

        return;
    }


    examList.innerHTML = "";


    data.forEach(function(exam) {

        const button =
            document.createElement("button");


        button.className = "option";

        button.textContent =
            exam.name;


        button.addEventListener(
            "click",
            function() {

                startExam(exam);

            }
        );


        examList.appendChild(button);

    });
}


// -------------------------
// START EXAM
// -------------------------

async function startExam(exam) {

    selectedExam = exam;


    examList.innerHTML =
        "<p>Questions loading...</p>";


    const { data, error } =
        await supabaseClient

            .from("questions")

            .select(`
                id,
                question_text,
                explanation,
                negative_marking,
                options (
                    id,
                    option_text,
                    is_correct
                )
            `)

            .eq("exam_id", exam.id)

            .order("id");


    if (error) {

        console.error(error);

        examList.innerHTML =
            "<p>Questions load नहीं हुए।</p>";

        return;
    }


    if (!data || data.length === 0) {

        examList.innerHTML =
            "<p>इस exam में अभी questions नहीं हैं।</p>";

        return;
    }


    questions = data;

    currentQuestion = 0;

    score = 0;


    document.querySelector(".card")
        .hidden = true;


    quizSection.hidden = false;

    resultSection.hidden = true;


    showQuestion();

}


// -------------------------
// SHOW QUESTION
// -------------------------

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    questionNumberElement.textContent =
        "Question " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    scoreElement.textContent =
        "Score: " + score;


    questionElement.textContent =
        question.question_text;


    optionsElement.innerHTML = "";


    feedbackElement.innerHTML = "";

    feedbackElement.hidden = true;


    nextButton.hidden = true;


    question.options.forEach(
        function(option) {

            const button =
                document.createElement("button");


            button.className =
                "option";


            button.textContent =
                option.option_text;


            button.addEventListener(
                "click",
                function() {

                    selectAnswer(
                        option.id
                    );

                }
            );


            optionsElement.appendChild(
                button
            );

        }
    );
}


// -------------------------
// SELECT ANSWER
// -------------------------

function selectAnswer(selectedId) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];


    const selectedOption =
        question.options.find(
            function(option) {

                return option.id === selectedId;

            }
        );


    const correctOption =
        question.options.find(
            function(option) {

                return option.is_correct === true;

            }
        );


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(
        function(button, index) {

            const option =
                question.options[index];


            button.disabled = true;


            if (option.is_correct) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedOption &&
        selectedOption.is_correct
    ) {

        score++;

        feedbackElement.innerHTML =
            "<strong>✓ Correct!</strong><br><br>" +

            "<strong>Explanation:</strong><br>" +

            (
                question.explanation ||
                "इस प्रश्न की explanation उपलब्ध नहीं है।"
            );

    } else {

        const selectedButton =
            Array.from(buttons).find(
                function(button, index) {

                    return question.options[index].id
                        === selectedId;

                }
            );


        if (selectedButton) {

            selectedButton.classList.add(
                "wrong"
            );

        }


        feedbackElement.innerHTML =
            "<strong>✗ Wrong!</strong><br><br>" +

            "<strong>Correct Answer:</strong> " +

            (
                correctOption
                    ? correctOption.option_text
                    : "Not available"
            ) +

            "<br><br>" +

            "<strong>Explanation:</strong><br>" +

            (
                question.explanation ||
                "Explanation उपलब्ध नहीं है।"
            );

    }


    scoreElement.textContent =
        "Score: " + score;


    feedbackElement.hidden = false;

    nextButton.hidden = false;

}


// -------------------------
// NEXT QUESTION
// -------------------------

nextButton.addEventListener(
    "click",
    function() {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            showResult();

        }

    }
);


// -------------------------
// RESULT
// -------------------------

function showResult() {

    quizSection.hidden = true;

    resultSection.hidden = false;


    const total =
        questions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    resultElement.innerHTML =

        "<h3>Score: " +
        score +
        " / " +
        total +
        "</h3>" +

        "<p>Accuracy: " +
        percentage +
        "%</p>";

}


// -------------------------
// BACK TO EXAMS
// -------------------------

restartButton.addEventListener(
    "click",
    function() {

        location.reload();

    }
);


// -------------------------
// START
// -------------------------

loadExams();1
