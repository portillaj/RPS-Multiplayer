var wins = 0;
var losses = 0;
var player1 = null;
var player2 = null;
var player1Choice = "";
var player2Choice = "";
var player1Name = "";
var player2Name = "";
var playerID = null;
var turn = 1;

var choices = ["Rock", "Paper", "Scissors"];

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3V3GtmIviBsH9QgLxnWV0Jlo4pGG3uKE",
    authDomain: "rock-paper-scissors-b9a88.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-b9a88.firebaseio.com",
    storageBucket: "rock-paper-scissors-b9a88.appspot.com",
    messagingSenderId: "289784370229"
  };
  firebase.initializeApp(config);
var database = firebase.database();
 

 var myWins = $("<p>").addClass("wins");
 	var myLosses = $("<p>").addClass("losses");
 	var ties = $("<p>").addClass("ties");
 		var greeting = $("<h2>").addClass("greeting");
	 	
	 	getPlayer();
  database.ref("/players").on("value", function(snapshot) {
  	console.log("Players updated");
  	//if player 1 exists
  	if(snapshot.child("player1").exists()){
  		console.log("Player 1 exists");
  		//player 1 gets object of player 1 input
  		player1 = snapshot.val().player1;
  		player1Name = player1.name;//gets player name
  
  		//greet player 1 with name
	  	greeting.html("Hi " + player1Name + "! You are Player 1");
		 $(".my-input").append(greeting);
		 //display rock paper scissor option
		 

		//display wins, losses, and tie
	  	myWins.html("Wins: " + player1.win);
	 	myLosses.html("Losses: " + player1.loss);
	 	ties.html("Ties: " + player1.tie);
	 	$(".player1").append(myWins);
	 	$(".player1").append(myLosses);
	 	$(".player1").append(ties);
	 	$("#player1-name").html(player1.name); 
	 	$(".hide-me").empty(); //hide input
	 	chooseOne();
 	}else {
 		console.log("Player 1 does Not exist");
 		//show input so player can input name
 		$(".hide-me").show();
 		//player object is null at the time
 		player1 = null;
 		//player name is blank at the time
 		player1Name = "";
 		$("#player1-name").html("Waiting for Player 1");
 	}
 		//if player 2 exists
 	if(snapshot.child("player2").exists()){
  		console.log("Player 2 exists");
  		//player 2 gets object of player 1 input
  		player2 = snapshot.val().player2;
  		player2Name = player2.name;
  		console.log(player2);

	  	greeting.html("Hi " + player2Name + "! You are Player 2");
		$(".my-input").append(greeting);
	 	//display rock paper scissor option
		
	  	myWins.html("Wins: " + player2.win);
	 	myLosses.html("Losses: " + player2.loss);
	 	ties.html("Ties: " + player2.tie);
	 	$(".player2").append(myWins);
	 	$(".player2").append(myLosses);
	 	$(".player2").append(ties);
	 	$("#player2-name").html(player2.name);
	 	chooseTwo();
	 
 	}else {

 		console.log("Player 2 does Not exist");
 		$(".hide-me").show(); //hide input
 		player2 = null;
 		//player name is blank at the time
		player2Name = "";
 		$("#player2-name").html("Waiting for Player 2");
 	}
});

//functions that gets players
function getPlayer(){
	//input player button
 $("#play-button").on("click", function(){
	 // Prevent the page from refreshing
   event.preventDefault();
   $(".hide").show();
   if(player1 == null){
   	playerID = 1;
   	console.log();
	 	//get the value from player 2
	 	playerName = $("#name").val().trim();
	 //set object for player2 if player1 exists	
		player1 = {
		 		loss: 0,
		  		name: playerName,
		  		win: 0,
		  		tie: 0,
		  		choice: ""
		  	};



	//add player 1 to database and thier properties	  	
	database.ref().child("/players/player" + playerID).set(player1);
	database.ref("/players/player1").onDisconnect().remove();
	
}else if(player1 !== null && player2 === null){
	playerID = 2;
	//get the value from player 2
	$(".hide-me").show();
	playerName = $("#name").val().trim();

	//set object for player2 if player1 exists
	player2 = {
				name: playerName,
				win: 0,
				loss: 0,
				tie: 0,
				choice: ""
			};

			chooseTwo();
	//add player 1 to database and thier properties	
	database.ref().child("/players/player" + playerID).set(player2);
	database.ref("/players/player2").onDisconnect().remove();

}//end else if 
	
 });//end click function
}//end function

//function that displays rock paper and scissor options
 function chooseOne(){
 	for (var i = 0; i < choices.length; i++) {
 		var select = $("<li>").addClass("my-choices").attr("data-name", choices[i]);
 
 		if(choices[i] === "Rock"){
 			select.html('<i class="fa fa-hand-rock-o rock-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-rock-o rock-icon-right" aria-hidden="true"></i>');
 		}else if(choices[i] === "Paper"){
 			select.html('<i class="fa fa-hand-paper-o paper-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-paper-o paper-icon-right" aria-hidden="true"></i>');
 		}else if(choices[i] === "Scissors"){
 			select.html('<i class="fa fa-hand-scissors-o scissors-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-scissors-o scissors-icon-right" aria-hidden="true"></i>');
 		}
 		$(".select-weapon").append(select);
 	}//end for loop
 	
 }//end function

 function chooseTwo(){
 	for (var i = 0; i < choices.length; i++) {
 		var select = $("<li>").addClass("my-choices2").attr("data-name", choices[i]);
 
 		if(choices[i] === "Rock"){
 			select.html('<i class="fa fa-hand-rock-o rock-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-rock-o rock-icon-right" aria-hidden="true"></i>');
 		}else if(choices[i] === "Paper"){
 			select.html('<i class="fa fa-hand-paper-o paper-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-paper-o paper-icon-right" aria-hidden="true"></i>');
 		}else if(choices[i] === "Scissors"){
 			select.html('<i class="fa fa-hand-scissors-o scissors-icon-left" aria-hidden="true"></i>' + choices[i] + '<i class="fa fa-hand-scissors-o scissors-icon-right" aria-hidden="true"></i>');
 		}
 		$(".select-weapon2").append(select);
 	}//end for loop
 	
 }//end function

setChoice();
setChoice2();

function setChoice(){
	$(".select-weapon").on("click", ".my-choices", function(){
		if (player1 && player2) {
			if(player1Name === player1.name && turn == 1) {
				// Record player2's choice
				console.log("clicked");
				var choice = $(this).data("name");

				// Record the player choice into the database
				player1Choice = choice;
				//database.ref().child("/players/player1/choice").set(choice);
				console.log(player1Choice);
				// Compare player1 and player 2 choices and record the outcome
				turn++;
				console.log("turn now is " + turn);
			}//end inner if
		}//end outer if

	});//end select-weapon click function
	
}//end function

//function that provides the logic for the game
function setChoice2(){
	$(".select-weapon2").on("click", ".my-choices2", function(){
		if (player1 && player2 !== null){
		 	if(player2Name === player2.name && turn == 2) {
				// Record player2's choice
				var choice = $(this).data("name");

				// Record the player choice into the database
				player2Choice = choice;
				//database.ref().child("/players/player2/choice").set(choice);
				console.log(player2Choice);
				// Compare player1 and player 2 choices and record the outcome
				gameLogic();		
			}
		}//end outer if

	});//end weapon click
	
}//end function

function gameLogic(){
	switch(player1.choice){
		case "Rock":
			if(player2.choice === "Rock"){
				console.log("this is working if rock come us: " + player1.choice);
				console.log("this is working if rock is chosen by p2" + player2.choice);
				database.ref().child("/players/player1/tie").set(player1.tie + 1);
				database.ref().child("/players/player2/tie").set(player2.tie + 1);
				break;
			}else if(player2.choice === "Paper"){
				database.ref().child("/players/player1/win").set(player1.loss + 1);
				database.ref().child("/players/player2/loss").set(player2.win + 1);
				break;
			}else if(player2.choice === "Scissors"){
				database.ref().child("/players/player1/win").set(player1.win + 1);
				database.ref().child("/players/player2/loss").set(player2.loss + 1);
				break;
			}
		case "Paper":
			if(player2.choice === "Paper"){
				console.log("this is working if rock come us: " + player1.choice);
				database.ref().child("/players/player1/tie").set(player1.tie + 1);
				database.ref().child("/players/player2/tie").set(player2.tie + 1);
				break;
			}else if(player2.choice === "Rock"){
				database.ref().child("/players/player1/win").set(player1.win + 1);
				database.ref().child("/players/player2/loss").set(player2.loss + 1);
				break;
			}else if(player2.choice === "Scissors"){
				database.ref().child("/players/player1/win").set(player1.loss + 1);
				database.ref().child("/players/player2/loss").set(player2.win + 1);
				break;
			}
		case "Scissors":
			if(player2.choice === "Scissors"){
				console.log("this is working if rock come us: " + player1.choice);
				database.ref().child("/players/player1/tie").set(player1.tie + 1);
				database.ref().child("/players/player2/tie").set(player2.tie + 1);
				break;
			}else if(player2.choice === "Rock"){
				database.ref().child("/players/player1/win").set(player1.loss + 1);
				database.ref().child("/players/player2/loss").set(player2.win + 1);
				break;
			}else if(player2.choice === "Scissors"){
				database.ref().child("/players/player1/win").set(player1.win + 1);
				database.ref().child("/players/player2/loss").set(player2.loss + 1);
				break;
			}
	}//end switch statement
	turn = 1;
}//end logic function


$(".submit-message").on("click", function(){
	var message = $(".message-input").val().trim();

	$("#message-area").append(player1.name + ": " + message);
	$(".message-input").val("");
});
  //is connected
  var connections = database.ref("/chat");
  console.log("Connection Ref: " + connections);

  var isConnected = database.ref(".info/connected");
  isConnected.on("value", function(childSnapshot) {
  	if(childSnapshot.val()){
  		var connect = connections.push(true);
  		connect.onDisconnect().remove();
  	}

  });

 connections.on("value", function(snap){
 	 console.log(snap.numChildren());
 	 
  });





