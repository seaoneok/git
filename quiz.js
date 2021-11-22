const quiz = document.getElementById('quiz');
const question = document.getElementById('choices');
const choices = Array.from(document.getElementsByClassName('choice'));
const score = document.getElementById('score');
const progress = document.getElementById('progress');
const progress_status = document.getElementById('status');

const point = 1;

let current_q = {};
let ans = false;
let current_score = 0;
let qcnt = 0;
let questions = [];

// questions_list
let available_q = [
    {
        question : "Purpose of designing the Javascript",
        choice1: "To Perform Server Side Scripting Operation",
        choice2: "To add interactivity to HTML Pages",
        choice3: "To Style HTML Pages",
        choice4: "All the above",
        answer: 2
    },
    {
        question : "Why so JavaScript and Java have similar name?",
        choice1: "They both originated on the island of Java",
        choice2: "JavaScript's syntax is loosely based on Java's",
        choice3: "Both A and B",
        choice4: "None of the above",
        answer: 2
    },
    {
        question : "Original Name of Javascript is",
        choice1: "Mocha",
        choice2: "LiveScript",
        choice3: "Escript",
        choice4: "Javascript",
        answer: 1
    },
    {
        question : "Which type of language is Javascript",
        choice1: "Programming",
        choice2: "Scripting",
        choice3: "Markup",
        choice4: "None of the above",
        answer: 2
    },
    {
        question : "Which is not valid data type in Javascript",
        choice1: "Undefinded",
        choice2: "Boolean",
        choice3: "float",
        choice4: "Number",
        answer: 3
    }   
];

// function to copy array
function clone(obj){
    var output = [];
    for(var i in obj){
        output[i] = obj[i];
    }
    return output;
}

// start_quiz
function start_quiz() {
    // number of question progressed.
    qcnt = 0;
    // reset score, store score
    current_score = 0;

    // copy available questions  to questions 
    questions = clone(available_q);

    // provide next question 
    index = Math.floor(Math.random() * questions.length);
    current_q = questions[index];
    question.innerText = current_q.question;

    choices.forEach((choice)=>{
        number = choice.dataset['number'];
        choice.innerText = current_q['choice' + number];
    });
    
    // number of question displayed += 1
    qcnt++;
    check_progress(qcnt);

    ans = true;  
    questions.splice(index,1);
      
    quiz.classList.remove('done');
};

function end_quiz() {
    localStorage.setItem('your_score', current_score);
    return window.location.assign("/end.html");
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!ans) return;

        ans = false;
        your_choice = e.target;
        your_answer = your_choice.dataset['number'];

        // check if the answer is correct or not
        solve_quiz = your_answer == current_q.answer ? 'correct' : 'incorrect';

        // if it is correct, score += 1
        if (solve_quiz === 'correct') {
            update_score(point);
        }

        your_choice.parentElement.classList.add(solve_quiz);

        // go to next question
        setTimeout(() => {
            your_choice.parentElement.classList.remove(solve_quiz);

            // maximum question is 4, if number of question is over 4, process quit -> open end page
            if(qcnt >= 4){
                    // store current_score 
                    end_quiz();
            }

            else{
                index = Math.floor(Math.random() * questions.length);
                current_q = questions[index];
                question.innerText = current_q.question;
            
                choices.forEach((choice)=>{
                    number = choice.dataset['number'];
                    choice.innerText = current_q['choice' + number];
                });
                
                qcnt++;
                check_progress(qcnt);

                ans = true;
                questions.splice(index,1);
            }
                    
        }, 1000);

    });
});

// status bar to show progress of quiz 
function check_progress(cnt){
    progress.innerText = `Question ${cnt}/${4}`;
    progress_status.style.width = `${(cnt/ 4) * 100}%`;
}

// update user's current score
function update_score(correct_score){
    current_score += correct_score;
    score.innerText = current_score;
};

start_quiz();