$(document).ready(function () {
    
    var options = [
        {
            question: "What year is the Chinese Year of the Dog?", 
            choice: ["2015", "2016", "2017", "2018"],	
            answer: 3,
            photo: "assets/images/newyear.jpg"
         },
         {
            question: "What is a Greyhounds top speed?",
            choice: ["45mph", "35mph", "50mph", "60mph"],
            answer: 0,
            photo: "assets/images/Greyhound.jpg"
         }, 
         {
             question: "How long can a Greyhound maintain top speed?", 
            choice: ["10 meters", "100 meters", "250 meters", "350 meters" ],
            answer: 2,
            photo: "assets/images/Greyhound.jpg"
        }, 
        {
            question: "What dog does not bark?", 
            choice: ["Border Collie", "Husky", "Beagle", "Basenji" ],
            answer: 3,
            photo: "assets/images/basenji.jpg"
        }, 
        {
            question: "Which dog has webbed feet?", 
            choice: ["Labador Retriever", "Newfoundland", "Chihauhua", "Chow Chow" ],
            answer: 1,
            photo: "assets/images/newfoundland.jpg"
        }, 
        {
            question: "What was the name of the first dog in space (1957)?", 
            choice: ["Spud", "Fred", "Laika", "Sally" ],
            answer: 2,
            photo: "assets/images/laika.jpg"
        }, 
        {
            question: "What is the largest breed of dog by height?", 
            choice: ["Great Dane", "St. Bernard", "Irish Wolfhound", "English Mastiff" ],
            answer: 2,
            photo: "assets/images/IrishWolfhound.jpg"
        }, 
        {
            question: "According to American Kennel Club registrations, what is the most popular dog in the United States?", 
            choice: ["Beagle", "Poodle", "Labrador Retriever", "Yorkshire Terrier"],
            answer: 2,
            photo: "assets/images/labrador-retriever.jpg"
        }];
    
        var correctCount = 0;
        var wrongCount = 0;
        var unanswerCount = 0;
        var timer = 20;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];      
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start-check to make sure not running and set to running
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timecount").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerdiv").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
      
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            //loop through answer array and display
            $("#questiondiv").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerdiv").append(userChoice);
    //		}
    }
    
        
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerdiv").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerdiv").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerdiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerdiv").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questiondiv").empty();
            $("#questiondiv").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerdiv").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerdiv").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerdiv").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerdiv").empty();
        $("#questiondiv").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
    