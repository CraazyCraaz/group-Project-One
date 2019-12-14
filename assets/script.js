/***************************************************************
 * CARD API
 ***************************************************************/

function newDeck(){
    var newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    $.get(newDeckUrl).then(function(response){
        console.log(response);
        var mainDeck = response.deck_id;
        console.log(mainDeck);
        var shuffleUrl = "https://deckofcardsapi.com/api/deck/" + mainDeck + "/shuffle/"
        
        var p1stack = "";
        var p2stack = "";
        var dealHalfUrlp1 = "https://deckofcardsapi.com/api/deck/" + mainDeck + "/draw/?count=26"
        
        function firstDeal(){
            $.get(dealHalfUrlp1).then(function(response){
                console.log(response);
            })
        }
        
        function shuffle(){
            $.get(shuffleUrl).then(function(response){
                console.log(response);
            });
        }
        
        $("#deal").on("click", function(){ 
            firstDeal(); 
        });
        $("#shuffle").on("click", function(){
            shuffle();
        });
    });
};
                                        $("#newDeck").on("click", function(){
                                            newDeck();
                                        });

        
        
        //  /***************************************************************
//  * DRINK API
//  ****************************************************************