const username = document.getElementById('username');
const saveBtn = document.getElementById('saveBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORE = 5;
console.log(highScores);
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveBtn.disabled = !username.value
})

saveHighScore = (e) => {
    console.log('Clicked save button');
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);
    highScores.sort( (a,b) => {
        return b.score - a.score;
    })
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}