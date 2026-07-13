console.log("JavaScript connected");
const topScreen = document.getElementById("top-screen");
const questionScreen = document.getElementById("question-screen");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", function(){
    topScreen.style.display = "none";
    questionScreen.style.display = "flex";
});