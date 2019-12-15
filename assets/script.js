/***************************************************************
 * CARD API
 ***************************************************************/

function newDeck() {
    var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    $.get(newDeckUrl).then(function (response) {
        console.log(response);
        var mainDeck = response.deck_id;
        console.log(mainDeck);
        var shuffleUrl = "https://deckofcardsapi.com/api/deck/" + mainDeck + "/shuffle/"

        var p1stack = "";
        var p2stack = "";
        var dealHalfUrlp1 = "https://deckofcardsapi.com/api/deck/" + mainDeck + "/draw/?count=26"

        function firstDeal() {
            $.get(dealHalfUrlp1).then(function (response) {
                console.log(response);
            })
        }

        function shuffle() {
            $.get(shuffleUrl).then(function (response) {
                console.log(response);
            });
        }

        $("#deal").on("click", function () {
            firstDeal();
        });
        $("#shuffle").on("click", function () {
            shuffle();
        });
    });
};
$("#newDeck").on("click", function () {
    newDeck();
});



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