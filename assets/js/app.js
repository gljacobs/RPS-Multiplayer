var players = [];

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

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");


$("#add-player").on("click", (e) => {
    e.preventDefault();
    var player = {
        name: "",
        choice: "",
        chat: [],
    };
    

    if (players.length < 2) {
        console.log("eyyy");
        
        
        player.name = $("#player-in").val();
        $("#player-in").val("");

        var con = connectionsRef.push(player);
        players.push(player)


        con.onDisconnect().remove();
    }
});