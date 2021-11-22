const totalScore = document.getElementById('total_score');
const your_score = localStorage.getItem('your_score');

total_score.innerText = "Total Score: " + your_score;
