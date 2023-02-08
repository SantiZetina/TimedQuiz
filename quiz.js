const question = document.getElementById('question')
const answers = Array.from(document.getElementsByClassName('answer-text'))
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = []

let questions = [
    {
        question: 'What is the largest land animal?',
        choice1: 'Elephant',
        choice2: 'Gorilla',
        choice3: 'Hippo',
        choice4: 'Rhino',
        answer: 1
    },
    {
        question: 'What is the fastest land animal?',
        choice1: 'Cheetah',
        choice2: 'Lion',
        choice3: 'Leopard',
        choice4: 'Jaguar',
        answer: 1
    },
    {
        question: 'What is the tallest bird?',
        choice1: 'Emu',
        choice2: 'Ostrich',
        choice3: 'Pelican',
        choice4: 'Flamingo',
        answer: 2
    },
    {
        question: 'What is the deepst diving mammal?',
        choice1: 'Whale Shark',
        choice2: 'Beluga Whale',
        choice3: 'Sperm Whale',
        choice4: 'Dolphine',
        answer: 3
    },
    {
        question: 'What is the largest species of shark?',
        choice1: 'Great White Shark',
        choice2: 'Tiger Shark',
        choice3: 'Bull Shark',
        choice4: 'Whale Shark',
        answer: 4
    },
    {
        question: 'What is the smallest mammal in the world?',
        choice1: 'Pygmy Shrew',
        choice2: 'Bumblebee Bat',
        choice3: 'Euasian Harvest Mouse',
        choice4: 'Golden-tailed Sapphire',
        answer: 2
    },
    {
        question: 'What is the largest species of cat?',
        choice1: 'Lion',
        choice2: 'Tiger',
        choice3: 'Jaguar',
        choice4: 'Leopard',
        answer: 2
    }
]



let timer = 60;
let intervalId = setInterval(function() {
    timer--;
    document.getElementById("timer").innerHTML = timer;
    if (timer === 0) {
        clearInterval(intervalId);
    }
}, 1000);


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
       localStorage.setItem('mostRecentScore', score)
       
        return window.location.assign('/quizEnd.html')
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
   const questionIndex = Math.floor(Math.random() * availableQuestion.length);
   currentQuestion = availableQuestion[questionIndex];
   question.innerText = currentQuestion.question;

   answers.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]
   });

   availableQuestion.splice(questionIndex, 1);

   acceptingAnswers = true;
}
answers.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const applyToClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


        if(applyToClass === 'correct'){
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(applyToClass)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(applyToClass)
             getNewQuestion();
        }, 1000)
       
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score
}

startQuiz();