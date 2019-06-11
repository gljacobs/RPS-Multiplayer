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

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}



$("#add-player").on("click", (e) => {
    e.preventDefault();
    var player = {
        name: "",
        choice: "",
        chat: [],
    };

    if (numPlayer == 0) {
        console.log(numPlayer);
        console.log("eyyy");
        numPlayer++;


        player.name = $("#player-in").val();
        $("#player-in").val("");

        database.ref("/player").set({
            p1: player,
            count: numPlayer
        });
        players.push(player);
        document.cookie = "content=<p>" + player.name + "</p><button class='p1-choice' id='p1-r' data-name='r'>Rock</button><button class='p1-choice' id='p1-p' data-name='p'>Paper</button><button class='p1-choice' id='p1-s' data-name='s'>Scissors</button>";
        $("#options").html(readCookie("content"));
    }
    else if (numPlayer == 1) {
        console.log("eyyy2");
        numPlayer++;


        player.name = $("#player-in").val();
        $("#player-in").val("");

        database.ref("/player").update({
            p2: player,
            count: numPlayer
        });
        players.push(player);
        document.cookie = "content=<p>" + player.name + "</p><button class='p2-choice' id='p2-r' data-name='r'>Rock</button><button class='p2-choice' id='p2-p' data-name='p'>Paper</button><button class='p2-choice' id='p2-s' data-name='s'>Scissors</button>";
        $("#options").html(readCookie("content"));
    }
    else {
        console.log(numPlayer);

        $("#player-in").val("PLAYERS FULL");
    }
});

$(document).on("click", ".p1-choice", function () {

    players[0].choice = $(this).attr("data-name");
    database.ref("/player").update({
        p1: players[0],
    });

    runGame();
});

$(document).on("click", ".p2-choice", function () {

    players[1].choice = $(this).attr("data-name");
    database.ref("/player").update({
        p2: players[1],
    });
    
    runGame();
});

database.ref().on("value", function (snapshot) {

    numPlayer = snapshot.val().player.count;
    players[0] = snapshot.val().player.p1;
    players[1] = snapshot.val().player.p2;

    if(players[0].choice === ""){
         renderHtml("#actions1", "<p id='action-1'>" + players[0].name + " is thinking...</p>");
    } else {
        renderHtml("#actions1", "<p id='action-2'>" + players[0].name + " is ready!</p>");
    }
    if(players[1].choice === ""){ 
        renderHtml("#actions2", "<p id='action-2'>" + players[1].name + " is thinking...</p>");
    } else {
        renderHtml("#actions2", "<p id='action-2'>" + players[1].name + " is ready!</p>");
    }
    runGame();
});

var renderHtml = function(where, what) {
    $(where).html(what);
}

var runGame = function () {
    if (players[0].choice !== "" && players[1].choice !== "") {
        if ((players[0].choice === "r" && players[1].choice === "s") ||
            (players[0].choice === "s" && players[1].choice === "p") ||
            (players[0].choice === "p" && players[1].choice === "r")) {

            $("#game").html("<h2>" + players[0].name + " wins!</h2>");
        } else if (players[0].choice === players[1].choice) {
            //ties++;
            $("#game").html("<h2>WOW ITS A TIE</h2>")

        } else {
            $("#game").html("<h2>" + players[1].name + " wins!</h2>");
        }
        players[0].choice = "";
        players[1].choice = "";

        database.ref("/player").update({
            p1: players[0],
            p2: players[1],
        });
    }
};
