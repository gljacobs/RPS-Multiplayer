var players = [];

var p1 = {
    name: "",
    choice: "",
    chat: [],
    exists: false
};

var p2 = {
    name: "",
    choice: "",
    chat: [],
    exists: false,
};

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

$("#add-player").on("click", (e) => {
    e.preventDefault();

    if (!p1.exists) {
        p1.name = $("#player-in").val();
        $("#player-in").val("");
        p1.exists = true;
        database.ref().set({
            player1: p1
        });
    }
    if (!p2.exists) {
        p2.name = $("#player-in").val();
        $("#player-in").val("");
        p2.exists = true;
        database.ref().set({
            player2: p2
        });
    }
});