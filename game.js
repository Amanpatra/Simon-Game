$("Document").ready(function() {
    
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;

    // Function for playing sounds.
    function playSound(name) {
        var audio=new Audio("sounds\\"+name+".mp3");
        audio.play();
    }

    // Function for new patterns.
    function nextSequence() {
        var randomNumber = Math.floor( Math.random() * 4 );
        var randomChosenColour = buttonColours[randomNumber];        
        // incrementing and displaying the level.
        level++;
        $("#level-title").html("level " + level);
        // playing sound, fading in and fading out of the next pattern
        gamePattern.push(randomChosenColour);
        playSound(randomChosenColour);
        $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    }

    // Function to restart the game(Re-intialising the variables).
    function startOver() {
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }

    // Function for the animation of button pressed(by adding and 
    // removing pressed class).
    function animatePress(currentColour) {
        $("." + currentColour).addClass("pressed");
        setTimeout(function() {
            $("." + currentColour).removeClass("pressed");
        }, 100)
    }

    // Function for checking the pattern clicked by the user with the game
    // pattern. If the pattern is corret then it will call the nextSequence().
    function checkAnswer(currnetLevel) {
        if(gamePattern[currnetLevel] === userClickedPattern[currnetLevel]){
            if (level === currnetLevel + 1) {
                // This if block checks for the end of the pattern. Hence, calls
                // nextSequence() for adding new pattern.
                setTimeout(function(){
                    nextSequence();
                    userClickedPattern = [];
                }, 1000)
            }
        } else {
            playSound("wrong");
            $("#level-title").html("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200)
            startOver();
        }        
    }

    // detecting the first keypress to start the game.
    $("body").keypress(function() {
        if (level === 0 ) {
            nextSequence();
        }
    })

    // detecting the clicked button and playing sound, animation of
    // the corresponding button.
    $(".btn").click(function() {
        if (level > 0) {
            var userChosenColour = this.id;
            userClickedPattern.push(userChosenColour);
            animatePress(userChosenColour);
            playSound(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        }
    })
    
})