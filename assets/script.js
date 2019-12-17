/***************************************************************
 * CARD API
 ***************************************************************/
var winCount = 0;
var rounds = 26;
var wager = 20;
// localStorage.setItem("bankroll", 1000);
function newDeck() {
    var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    if(!localStorage.getItem("bankroll")){
        localStorage.setItem("bankroll", 1000);
    }
    $.get(newDeckUrl).then(function (response) {
        console.log(response);
        localStorage.setItem("mainDeck", response.deck_id)
    });
};

function firstDeal() {
    var deck = localStorage.getItem("mainDeck");
    var dealHalfUrlp1 = "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=26"
    var dealHalfUrlp2 = "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=26"

    $.get(dealHalfUrlp1).then(function (response) {
        console.log(response);
        for (var i = 0; i < 26; i++) {
            var temp = response.cards[i].code
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P1/add/?cards=" + temp);
        }
    })

    $.get(dealHalfUrlp2).then(function (response) {
        console.log(response);
        for (var i = 0; i < 26; i++) {
            var temp = response.cards[i].code
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P2/add/?cards=" + temp);
        }
    })
}

function shuffle() {
    var deck = localStorage.getItem("mainDeck");
    rounds = 26;
    winCount = 0;
    var shuffleUrl = "https://deckofcardsapi.com/api/deck/" + deck + "/shuffle/"
    console.log("shuffled");
    $.get(shuffleUrl);
}



    function playACard() {
        var deck = localStorage.getItem("mainDeck");
        rounds --;
        console.log(rounds);
        
        
        $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P1/draw/bottom/?count=1").then(function (response) {
            localStorage.setItem("p1Card", response.cards[0].code)
            localStorage.setItem("p1ImgUrl", response.cards[0].image)
            $("#userCard").attr("src", localStorage.getItem("p1ImgUrl"))
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/pot/add/?cards=" + response.cards[0].code);
            
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P2/draw/bottom/?count=1").then(function (response) {
                localStorage.setItem("p2Card", response.cards[0].code);
                localStorage.setItem("p2ImgUrl", response.cards[0].image);
                $("#CpuCard").attr("src", localStorage.getItem("p2ImgUrl"));
                $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/pot/add/?cards=" + response.cards);
                
                compare();
            })
        })
    }

// This section will need to wait for reply from API to work. setTimeout?
// function moveACard(moveFrom, moveTo){
    //     var deck = localStorage.getItem("mainDeck");
    //     $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/" + moveFrom + "/draw/?count=1").then(function (response) { 
        //         console.log(response.cards[0].code);
        
        //         localStorage.setItem("movingCard" , response.cards[0].code)
        //     });
        //     $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/" + moveTo + "/add/?cards=" + localStorage.getItem("movingCard"));
        // }
        
        function compare() {
            var deck = localStorage.getItem("mainDeck");
            var p1Rank = localStorage.getItem("p1Card").split("");
            console.log(p1Rank[0] + " p1rank");
            if (p1Rank[0] === "0") {
                p1Rank[0] = 10
                // console.log(p1Rank + " fix");
            }
            if (p1Rank[0] === "J") {
                p1Rank[0] = 11
                // console.log(p1Rank + " fix");
            }
            if (p1Rank[0] === "Q") {
                p1Rank[0] = 12
                // console.log(p1Rank + " fix");
            }
            if (p1Rank[0] === "K") {
                p1Rank[0] = 13
                // console.log(p1Rank + " fix");
            }
            if (p1Rank[0] === "A") {
                p1Rank[0] = 14
                // console.log(p1Rank + " fix");
            }
            var p2Rank = localStorage.getItem("p2Card").split("");
            console.log(p2Rank[0] + " p2rank");
            if (p2Rank[0] === "0") {
                p2Rank[0] = 10
                // console.log(p2Rank + " fix");
            }
            if (p2Rank[0] === "J") {
                p2Rank[0] = 11
                // console.log(p2Rank + " fix");
            }
            if (p2Rank[0] === "Q") {
                p2Rank[0] = 12
                // console.log(p2Rank + " fix");
            }
            if (p2Rank[0] === "K") {
                p2Rank[0] = 13
                // console.log(p2Rank + " fix");
            }
            if (p2Rank[0] === "A") {
                p2Rank[0] = 14
                // console.log(p2Rank + " fix");
            }
            if (p2Rank[0] > p1Rank[0]) {
                console.log("p2wins");
                $("#result").text("Computer wins.");
                bank = parseInt(localStorage.getItem("bankroll"));
                bank -= wager;
                localStorage.setItem("bankroll", bank);
                $("#winningsDisplay").text(bank);
                // moveACard("pot" , "P2"); //This function isn't finished
                
            }
            if (p1Rank[0] > p2Rank[0]) {
                console.log("p1wins");
                $("#result").text("You win this round, human!");
                bank = parseInt(localStorage.getItem("bankroll"));
                bank += wager;
                localStorage.setItem("bankroll", bank);
                $("#winningsDisplay").text(bank);
                winCount++;
                console.log(winCount);
        
            }
            if (p1Rank[0] === p2Rank[0]) {
                // winCount++;
                // console.log(winCount);
                $("#result").text("Push. BOOOOORRRRING!")
                // console.log("RUNOFF!");
                // runoff();
            }
            if(rounds === 0){
            console.log("Game over!");
            $("#finalScore").text("Game Over! \n You won " + winCount + " Rounds.");
            $("#startNewRound").css("display", "block");
            
            }
        }
// function runoff(){
//     $.get("https://deckofcardsapi.com/api/deck/" + localStorage.getItem("mainDeck") + "/pile/p1/list/").then(function (response) {
//     var p1DeckSize = response.piles.P1.remaining;
//     var p2DeckSize = response.piles.P2.remaining;
//     var potSize = response.piles.pot.remaining;
//     console.log(p1DeckSize + " p1 cards remain");
//     console.log(p2DeckSize + " p2 cards remain");
//     console.log(potSize + " cards in pot");

//     if(p1DeckSize > 1 && p2DeckSize > 1){

//     }

//     })

// }
$("#wagerDisplay").text(wager)
$("#winningsDisplay").text(localStorage.getItem("bankroll"));

function decreaseWager(){
    if(wager > 0){
        wager -= 5;
        $("#wagerDisplay").text(wager)
    }
}
function increaseWager(){
    wager += 5;
    $("#wagerDisplay").text(wager)
}
    

$("#newGame").on("click", function(){
    if(!localStorage.getItem("mainDeck")){
        newDeck();
        setTimeout(function(){ 
            shuffle()
        }, 300);
        setTimeout(function(){
            firstDeal();
        }, 300);
    }
    else{
        shuffle();
        setTimeout(function(){
            firstDeal();
        }, 300);

    }

})

$("#deal").on("click", function () {
    firstDeal();
});

$("#shuffle").on("click", function () {
    shuffle();
});

$("#newDeck").on("click", function () {
    newDeck();
});

$("#playCard").on("click", function () {
    if(rounds >= 0){
        playACard();
    }
    else{
        console.log("You need to shuffle and deal to play.");        
    }
})
$("#wagerIncrease").on("click", function() {
    increaseWager();
})

$("#wagerDecrease").on("click", function () {
    decreaseWager();
})

$("#startNewRound").on("click", function () {
    shuffle();
    setTimeout(function(){
        firstDeal();
    }, 300);
    $("#finalScore").text("oh, I see you want some more!")
})


//  /***************************************************************
//  * DRINK API
//  ****************************************************************

/**********************************
 * Search drink by name
 **********************************/
var drinkChoice = "";
var drinkURL = "";

function drinkInfo() {
    $.ajax({
        url: drinkURL,
        method: "GET"
    }).then(function (response) {

        var drinkName = $("<h3>").append(response.drinks[0].strDrink);
        drinkName.addClass("drinkBackground")
        var drinkImg = $("<img>").attr("src", response.drinks[0].strDrinkThumb);
        drinkImg.width(200);
        var drinkIngredients = "";
        var measure = "";
        $("#drinkDisplay").empty();
        $("#One").empty();
        $("#Two").empty();
        $("#drinkDisplay").append(drinkName, drinkImg)
        for (let i = 1; i < 15; i++) {
            if (response.drinks[0]["strIngredient" + i] != null) {
                drinkIngredients = $("<p>").append(response.drinks[0]["strIngredient" + i]);
                drinkIngredients.addClass("drinkBackground");
                $("#One").append(drinkIngredients);
            }
        }

        for (let j = 1; j < 15; j++) {
            if (response.drinks[0]["strMeasure" + j] != null) {
                measure = $("<p>").append(response.drinks[0]["strMeasure" + j]);
                measure.addClass("drinkBackground");
                $("#Two").append(measure);

            }
        }
    });
}

// Event handler for user clicking the searchDrink button
$("#searchDrink").on("click", function (event) {
    // event.preventDefault(); ONLY USEFUL FOR FORM TAG / SUBMIT BUTTON
    $("#drinkTable").css("display", "block");
    drinkChoice = $("#drinkChoice").val()
    drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkChoice;


    drinkInfo();
});


/**********************************
 * Random Drink
 **********************************/
var randomDrinkURL = "";
function randomDrinkInfo() {
    $.ajax({
        url: randomDrinkURL,
        method: "GET"
    }).then(function (response) {

        var drinkName = $("<h3>").append(response.drinks[0].strDrink);
        drinkName.addClass("drinkBackground")
        var drinkImg = $("<img>").attr("src", response.drinks[0].strDrinkThumb);
        drinkImg.width(200);
        var drinkIngredients = "";
        var measure = "";
        $("#drinkDisplay").empty();
        $("#One").empty();
        $("#Two").empty();
        $("#drinkDisplay").append(drinkName, drinkImg)
        for (let i = 1; i < 15; i++) {
            if (response.drinks[0]["strIngredient" + i] != null) {
                drinkIngredients = $("<p>").append(response.drinks[0]["strIngredient" + i]);
                drinkIngredients.addClass("drinkBackground");
                $("#One").append(drinkIngredients);
            }
        }

        for (let j = 1; j < 15; j++) {
            if (response.drinks[0]["strMeasure" + j] != null) {
                measure = $("<p>").append(response.drinks[0]["strMeasure" + j]);
                measure.addClass("drinkBackground");
                $("#Two").append(measure);

            }
        }
    });
}

$("#randomDrink").on("click", function (event) {
    $("#drinkTable").css("display", "block");
    var drinkArray = ["margarita", "long island iced tea", "a1", "dragonfly", "imperial fizz", "mojito", "bloody mary", "royal bitch", "artic mouthwash"]
    var randomDrinkArray = drinkArray[Math.floor(Math.random() * drinkArray.length)];
    randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomDrinkArray;


    randomDrinkInfo();
});

// MODAL EVENT LISTENER
$(document).ready(function () {
    $('.modal').modal();

});

//start new game
$("#newGame").on("click", function () {
    $("#mainContain").css("display", "block");
    $("#newGame").css("display", "none");
});

//js to flip the cards
$("#card").flip({
    trigger: 'manual'
});
$("#card").flip('toggle');

