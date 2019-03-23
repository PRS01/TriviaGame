$(document).ready(function() {
  var options = [
    {
      question: "What year was Robin Hood: Men in Tights released?",
      choice: ["1995", "1991", "1993", "1992"],
      answer: 2,
      photo: "assets/images/Men_in_Tights.jpg"
    },
    {
      question: "What movies is Robin Hood: Men in Tights a spoof of?",
      choice: [
        "The Adventures Of Robin Hood",
        "Robin Hood: Princes of Thieves",
        "When Things Were Rotten",
        "Robin and Marian"
      ],
      answer: 1,
      photo: "assets/images/Prince_of_Thieves.jpg"
    },
    {
      question: "What character fell through the roof of Latrine?",
      choice: ["Robin Hood", "Sheriff", "King Richard", "Prince John"],
      answer: 1,
      photo: "assets/images/latrine.jpg"
    },
    {
      question: "What kept moving on Prince John's face through out the movie?",
      choice: ["A spider", "A mole", "A tattoo", "A scar"],
      answer: 1,
      photo: "assets/images/mole.jpg"
    },
    {
      question:
        "Which actor said the line; Because, unlike some other Robin Hoods, I can speak with and English accent?",
      choice: ["Roger Rees", "Cary Elwes", "Richard Lewis", "Mark Blankfield"],
      answer: 1,
      photo: "assets/images/cary_elwes.jpg"
    },
    {
      question: "What character had special underwear, made by Everlast?",
      choice: ["Broomhilde", "Latrine", "Marian", "Rabbi Tuckman"],
      answer: 2,
      photo: "assets/images/everlast.jpg"
    },
    {
      question: "Who played King Richard?",
      choice: [
        "Dom Deluise",
        "Eric Allan Kramer",
        "Sir Patrick Stewart",
        "Richard Lewis"
      ],
      answer: 2,
      photo: "assets/images/patrickStewart.png"
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 15;
  var intervalId;
  var userGuess = "";
  var running = false;
  var pick;
  var index = 0;

  $("#reset").hide();
  //start play
  $("#start").on("click", function() {
    $("#start").hide();
    displayQuestion();
    runTimer();
  });
  //timer start-check to make sure not running and set to running
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timecount").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      index++;
      stop();
      $("#answerbox").html(
        "<p>Time is up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
      hidepicture();
    }
  }

  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }

  //display question and loop though and display possible answers
  function displayQuestion() {
    pick = options[index];

    //loop through answer array and display
    $("#questionbox").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.choice[i]);
      //assign array position to it so can check answer
      userChoice.attr("data-guessvalue", i);
      $("#answerbox").append(userChoice);
    }

    //click function to select answer and outcomes
    $(".answerchoice").on("click", function() {
      userGuess = parseInt($(this).attr("data-guessvalue"));
      //increase index of question so that reads next question in array
      index++;
      //correct guess or wrong guess outcomes
      if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("#answerbox").html("<p>Correct!</p>");
        hidepicture();
      } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answerbox").html(
          "<p>Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );
        hidepicture();
      }
    });
  }

  function hidepicture() {
    $("#answerbox").append("<img src=" + pick.photo + ">");

    var hidepic = setTimeout(function() {
      $("#answerbox").empty();
      timer = 15;

      //run the score screen if all questions answered
      if (wrongCount + correctCount + unanswerCount === options.length) {
        $("#questionbox").empty();
        $("#questionbox").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answerbox").append("<h4> Correct: " + correctCount + "</h4>");
        $("#answerbox").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answerbox").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        $("#reset").show();
      } else {
        runTimer();
        displayQuestion();
      }
    }, 1500);
  }

  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerbox").empty();
    $("#questionbox").empty();
    correctCount = 0;
    wrongCount = 0;
    unanswerCount = 0;
    index = 0;
    // for (var i = 0; i < holder.length; i++) {
    //   options.push(holder[i]);
    // }
    runTimer();
    displayQuestion();
  });
});
