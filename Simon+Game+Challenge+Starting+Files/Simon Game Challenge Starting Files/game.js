var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

});


function nextSequence(){

    level++;

    $("h1").text("Level " + level);

    var randomNumber  = Math.floor(Math.random() * 4);
    
    var randomChooserColour = buttonColours[randomNumber];

    gamePattern.push(randomChooserColour);

    $("#" + randomChooserColour).fadeOut(100).fadeIn(100).fadeOut(100);

    playSound(randomChooserColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    $('#' + currentColour).addClass("pressed");

    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");
    }, 100);

}

$("h1").text("Press A key to start");

$(document).keydown(function(){
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        else{
            console.log("wrong");
            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            
        } 
    }

}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
  
