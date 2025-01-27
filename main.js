const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [],
  userClickedPattern = [],
  started = false,
  level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4),
    randomChosenColor = buttonColours[randomNumber];
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  $(".button").text("Start");
  $(".button").css("display", "none");

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

/* ------------------------- function to play sounds ------------------------ */

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/* --------------------- detect when buttons are pressed -------------------- */

$(".btn").click(function () {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

/* --------------------------- animate the buttons -------------------------- */

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

/* ----------------------------- start the game ----------------------------- */

$(document).keypress(function () {
  startGame();
});

$(".button").click(function () {
  startGame();
});

function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

/* ---------------------------- check the answer ---------------------------- */

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $(".button").text("Start Again");
  $(".button").css("display", "inline-block");
  $(".button").click(() => {
    startGame();
  });

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

/* ------------------ function to start from the beginning ------------------ */

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}