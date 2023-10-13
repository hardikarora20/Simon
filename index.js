var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var mod = false;

$(document).ready(function () {
    var topScore = localStorage.getItem("score");
    if(topScore != null)
        $("#highScoreValue").text(topScore);
    else    
        localStorage.setItem("score", 0);
});

function setScore(score){
    var saved = localStorage.getItem("score");
    if(saved == null || saved < score){
        localStorage.setItem("score", score);
        topScore = score;
        $("#highScoreValue").text(score);
    }
}

$(".high").click(function(){
    mod = true;
    $("body").addClass("mod");
    console.log("mod :)");
});

$(document).keypress(function (event) { 
    if(!started){
        startGame();
    }
});

$("h1").click(function(){
    if(!started)
        startGame();
});

function randomize(currButton){
    if(mod){
        currButton.style.backgroundColor = buttonColors[(Math.floor(Math.random() * buttonColors.length))];
    }
}

function startGame() {
    $("#level-title").text("Level " + level);
    // setTimeout(nextSequence, 600);
    nextSequence();
    started = true;
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userPattern = [];
    randomChosenColour();
}

function randomChosenColour(){
    var color = buttonColors[(Math.floor(Math.random() * buttonColors.length))];
    buttonClick(color);
    gamePattern.push(color);
    return color;
}

function checkAnswer(currLevel){
    if (gamePattern[currLevel] === userPattern[currLevel]) {
        console.log("success");
        if (userPattern.length === gamePattern.length)
          setTimeout(nextSequence, 1000);
    } 
    else 
    {
        if(started)
            gameOver();
        console.log("wrong");
    }
}

function gameOver() {
    startOver();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    new Audio("sounds/wrong.mp3").play();
    $("#level-title").html("Game Over!");
}

function startOver() {
    setScore(level);
    started = false;
    level = 0;
    gamePattern = [];
}

function buttonClick(currButton){ 
    animateButton(currButton);
    playSound(currButton);
}

$("div.btn").click(function(){
    if(started){
        randomize(this);
        buttonClick(this.id);
        userPattern.push(this.id);
        checkAnswer(userPattern.length - 1);
    }
});

function animateButton(currButton) {
    $("#" + currButton).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currButton).addClass("pressed");
    setTimeout(function () {
        $("#" + currButton).removeClass("pressed");
    }, 100);
}

function playSound(button){
    new Audio("sounds/"+button+".mp3").play();
}