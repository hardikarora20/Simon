var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function (event) { 
    if(!started){
        startGame();
    }
});

$("h1").click(function(){
    if(!started)
        startGame();
});

function startGame() {
    $("#level-title").text("Level " + level);
    setTimeout(nextSequence, 600);
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
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    new Audio("sounds/wrong.mp3").play();
    startOver();
    $("#level-title").html("Game Over!");
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

function buttonClick(currButton){ 
    animateButton(currButton);
    playSound(currButton);
}

$("div.btn").click(function(){
    buttonClick(this.id);
    userPattern.push(this.id);
    checkAnswer(userPattern.length - 1);
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