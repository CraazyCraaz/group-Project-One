/***************************************************************
 * CARD API
 ***************************************************************/

var mainDeck = "";
var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
function newDeck(){
    $.get(newDeckUrl).then(function(response){
        console.log(response);
        mainDeck = response.deck_id;  
        console.log(mainDeck);
    })
};








$("button").on("click", function(){ //Generic test button handler. This makes all the buttons call whatever funcion is within. You can comment out the function and put in your own for test purposes.
    newDeck(); // Calls for a new deck. Replaces deck ID.
})




//  /***************************************************************
//  * DRINK API
//  ****************************************************************