// alert("hello");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
    var userChosenColour = $(this). attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel1) {
    if (gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {
        console.log("Success");
        console.log(userClickedPattern);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 2000);
        
        startOver();
    }
} 

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours [randomNumber];
    gamePattern.push (randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    var audio = new Audio("sounds/"+ randomChosenColour +".mp3");
    audio.play();
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}