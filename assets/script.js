/***************************************************************
 * CARD API
 ***************************************************************/

var mainDeck = "4ngaeo0qkd4m"; //for testing purposes
var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
function newDeck(){
    $.get(newDeckUrl).then(function(response){
        console.log(response);
        mainDeck = response.deck_id;  
        console.log(mainDeck);
    })
};

var p1stack = "";
var p2stack = "";
var dealHalfUrlp1 = "https://deckofcardsapi.com/api/deck/" + mainDeck + "/draw/?count=26"
function firstDeal(){
    $.get(dealHalfUrlp1).then(function(response){
        console.log(response);
    })
}







$("a").on("click", function(){ //Generic test button handler. This makes all the buttons call whatever funcion is within. You can comment out the function and put in your own for test purposes.
    //newDeck(); // Calls for a new deck. Replaces deck ID.
    firstDeal();
})




//  /***************************************************************
//  * DRINK API
//  ****************************************************************