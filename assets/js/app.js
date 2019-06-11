var players = [];
var numPlayer = 0;

var config = {
    apiKey: "AIzaSyDNG5Ze8prVwVwa7GKyX_t_7Vc6H743xy8",
    authDomain: "rps-multi-12251.firebaseapp.com",
    databaseURL: "https://rps-multi-12251.firebaseio.com",
    projectId: "rps-multi-12251",
    storageBucket: "rps-multi-12251.appspot.com",
    messagingSenderId: "598644354715",
    appId: "1:598644354715:web:064bb00c1ae7eafa"
};

firebase.initializeApp(config);

var database = firebase.database();

var playerRef = database.ref("/player");

$("#add-player").on("click", (e) => {
    e.preventDefault();
    var player = {
        name: "",
        choice: "",
        chat: [],
    };

    if (numPlayer === 0) {
        console.log("eyyy");
        numPlayer++;
        
        
        player.name = $("#player-in").val();
        $("#player-in").val("");

        database.ref("/player").set({
            p1: player,
            count: numPlayer
        });
        players.push(player);
    }
    else if(numPlayer === 1) {
        console.log("eyyy2");
        numPlayer++;
        
        
        player.name = $("#player-in").val();
        $("#player-in").val("");

        database.ref("/player").update({
            p2: player,
            count: numPlayer
        });
        players.push(player);
    }
    else {
        $("#player-in").val("PLAYERS FULL");
    }

    console.log(database.ref().once('value'));
    
});

database.ref().on("value", function(snapshot) { 
        numPlayer = snapshot.val().count;
        players[0] = snapshot.val().p1;
        players[0] = snapshot.val().p2;
});
