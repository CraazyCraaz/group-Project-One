/***************************************************************
 * CARD API
 ***************************************************************/
function newDeck() {
    var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

    $.get(newDeckUrl).then(function (response) {
        console.log(response);
        localStorage.setItem("mainDeck" , response.deck_id)
    });
};

function firstDeal() {
    var deck = localStorage.getItem("mainDeck");
    var dealHalfUrlp1 = "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=26"
    var dealHalfUrlp2 = "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=26"
    
    $.get(dealHalfUrlp1).then(function (response) {
        console.log(response);
        for(var i = 0; i < 26; i++){
            var temp = response.cards[i].code
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P1/add/?cards=" + temp);
        }
    })

    $.get(dealHalfUrlp2).then(function (response) {
        console.log(response);
        for(var i = 0; i < 26; i++){
            var temp = response.cards[i].code
            $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P2/add/?cards=" + temp);
        }
    })
}

function shuffle() {
    var deck = localStorage.getItem("mainDeck");
    var shuffleUrl = "https://deckofcardsapi.com/api/deck/" + deck + "/shuffle/"
    console.log("shuffled");
    $.get(shuffleUrl);
}

function playACard() {
    var deck = localStorage.getItem("mainDeck")
    $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P1/draw/?count=1").then(function (response){
        localStorage.setItem("p1Card", response.cards[0].code)
        localStorage.setItem("p1ImgUrl", response.cards[0].image)
        // console.log(response.cards[0].code + "response");
        // console.log(localStorage.getItem("p1Card")[0] + "from storage");
        $("#userCard").attr("src",localStorage.getItem("p1ImgUrl"))
    })
    $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P2/draw/?count=1").then(function (response){
        localStorage.setItem("p2Card", response.cards[0].code)
        console.log(response.cards[0].code);
    })
}

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
    playACard();
})



//  /***************************************************************
//  * DRINK API
//  ****************************************************************

// BASED ON A TEXTARE FOR DRINK NAME AND "RANDOM" BUTTON

var drinkChoice = "";
var drinkURL = "";
var randomDrinkURL = "";


/**********************************
 * Search drink by name
 **********************************/
function drinkInfo() {
    $.ajax({
        url: drinkURL,
        method: "GET"
    }).then(function (response) {

        var drinkName = $("<h2>").append(response.drinks[0].strDrink);
        var drinkImg = $("<img>").attr("src", response.drinks[0].strDrinkThumb);
        var drinkIngredients = "";
        var measure = "";
        $("#drinkDisplay").empty();
        $("#drinkDisplay").append(drinkName, drinkImg)
        for (let i = 1; i < 15; i++) {
            if (response.drinks[0]["strIngredient" + i] != null) {
                drinkIngredients = $("<p>").append(response.drinks[0]["strIngredient" + i]);
                $("#drinkDisplay").append(drinkIngredients)
            }
        }

        for (let j = 1; j < 15; j++) {
            if (response.drinks[0]["strMeasure" + j] != null) {
                measure = $("<p>").append(response.drinks[0]["strMeasure" + j]);
                $("#drinkDisplay").append(measure);

            }
        }
    });
}
// Event handler for user clicking the searchDrink button
$("#searchDrink").on("click", function (event) {
    // event.preventDefault(); ONLY USEFUL FOR FORM TAG / SUBMIT BUTTON
    drinkChoice = $("#drinkChoice").val()
    drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkChoice;


    drinkInfo();
});


/**********************************
 * Random Drink
 **********************************/
function randomDrinkInfo() {
    $.ajax({
        url: randomDrinkURL,
        method: "GET"
    }).then(function (response) {

        var drinkName = $("<h2>").append(response.drinks[0].strDrink);
        var drinkImg = $("<img>").attr("src", response.drinks[0].strDrinkThumb);
        var drinkIngredients = "";
        var measure = "";
        $("#drinkDisplay").empty();
        $("#drinkDisplay").append(drinkName, drinkImg)
        for (let i = 1; i < 15; i++) {
            if (response.drinks[0]["strIngredient" + i] != null) {
                drinkIngredients = $("<p>").append(response.drinks[0]["strIngredient" + i]);
                $("#drinkDisplay").append(drinkIngredients)
            }
        }

        for (let j = 1; j < 15; j++) {
            if (response.drinks[0]["strMeasure" + j] != null) {
                measure = $("<p>").append(response.drinks[0]["strMeasure" + j]);
                $("#drinkDisplay").append(measure);

            }
        }
    });
}

$("#randomDrink").on("click", function (event) {
    var randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    randomDrinkInfo();
});

// MODAL EVENT LISTENER
  $(document).ready(function(){
    $('.modal').modal();
  });
