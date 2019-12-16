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
        $("#userCard").attr("src",localStorage.getItem("p1ImgUrl"))

        $.get("https://deckofcardsapi.com/api/deck/" + deck + "/pile/P2/draw/?count=1").then(function (response){
            localStorage.setItem("p2Card", response.cards[0].code);
            localStorage.setItem("p2ImgUrl", response.cards[0].image);
            $("#CpuCard").attr("src", localStorage.getItem("p2ImgUrl"));
            
            compare();
        })
    })
}
function compare() {
    var p1Rank = localStorage.getItem("p1Card").split("");
    // var temp = p1Rank.split("");
    console.log(p1Rank[0] + " p1rank");
    if(p1Rank[0] === "0"){
        p1Rank[0] = 10
        console.log(p1Rank + " fix");   
    }
    if(p1Rank[0] === "J"){
        p1Rank[0] = 11
        console.log(p1Rank + " fix");   
    }
    if(p1Rank[0] === "Q"){
        p1Rank[0] = 12
        console.log(p1Rank + " fix");   
    }
    if(p1Rank[0] === "K"){
        p1Rank[0] = 13
        console.log(p1Rank + " fix");   
    }
    if(p1Rank[0] === "A"){
        p1Rank[0] = 14
        console.log(p1Rank + " fix");   
    }
    var p2Rank = localStorage.getItem("p2Card").split("");
    // var temp = p1Rank.split("");
    console.log(p2Rank[0] + " p2rank");
    if(p2Rank[0] === "0"){
        p2Rank[0] = 10
        console.log(p2Rank + " fix");   
    }
    if(p2Rank[0] === "J"){
        p2Rank[0] = 11
        console.log(p2Rank + " fix");   
    }
    if(p2Rank[0] === "Q"){
        p2Rank[0] = 12
        console.log(p2Rank + " fix");   
    }
    if(p2Rank[0] === "K"){
        p2Rank[0] = 13
        console.log(p2Rank + " fix");   
    }
    if(p2Rank[0] === "A"){
        p2Rank[0] = 14
        console.log(p2Rank + " fix");   
    }
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
