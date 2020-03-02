var arrayPlayers = new Array();
var names = new Array();
var currentPlayer;

function addNewPlayer() {

	var newPlayerName = document.getElementById("name").value;

	//var newShopMaxPictures = document.getElementById("maxPictures").value;



	var newPlayer = {
			"name": newPlayerName,
	}


	console.log(newPlayer);
	cleanFieldsNewPlayer();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://rafelserra.mooo.com/players",
		data: JSON.stringify(newPlayer),    
		success: function(data) {
			console.log(data);
			printId(data, "printId");
			//currentPlayer = data;
		},
		error: function(){
			alert("json not found");
		}
	});

}

function printId(object) {
	var name = object.name;
	if (name == null) {
		name = "ANONYMOUS";
	}
	document.getElementById("printId").innerHTML= "User: " + name + ", created with id: "+ object.id;
}


function cleanFieldsNewPlayer() {
	document.getElementById("name").value="";
	//document.getElementById("maxPictures").value="";

}



function loadIds(playerId) {
	var constructedUrl = "http://rafelserra.mooo.com/players/";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			manage(data,playerId);

		},
		error: function(){
			alert("json not found");
		}
	});


}


function manage(objects,playerId) {
	var options;
	for (var i=0; i<objects.length; i++) { //.content
		options += '<option value="'+objects[i].id+'">'+objects[i].id+'</option>';	 //.content
		arrayPlayers.push(objects[i]); //.content
	}
	document.getElementById(playerId).innerHTML = options;
}


function playNewGame() {

	
    welcome3();
	
	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
/*    var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
    var currentPlayer;
    for (var i=0; i<arrayPlayers.length; i++) {
    	if (currentPlayerId==arrayPlayers[i].id) {
    		currentPlayer = arrayPlayers[i];
    	}
    }*/

    console.log(currentPlayer);
 

    
  //  if (currentShop.numPictures < currentShop.maxPictures) {
    	   var newGame = {
    				player: currentPlayer
    		}

    	    var constructedURL = "http://rafelserra.mooo.com/players/" + currentPlayer.id + "/games";
    		console.log(constructedURL);

    		$.ajax({
    			type: "POST",
    			contentType: "application/json",
    			url: constructedURL,
    			data: JSON.stringify(newGame),  
    			success: function(data) {
    				console.log("success");
    				//location.reload();
    				seeDice(data);
    			},
    			error: function(){
    				alert("json not found");
    			}
    		});
  //  } else {
   // 	document.getElementById("pictureLimit").innerHTML = "Maximum number of pictures for this shop is: " + currentShop.maxPictures;
    //}
    


}

function seeDice(data) {
	
	console.log(JSON.stringify(data));
	printGame(data, "result");
	
	//data.dice1;
	//data.dice2;
	
	document.getElementById("result").innerHTML += 
		 '<video width="320" height="180" autoplay="autoplay" muted="">'
    +'<source src="L-'+data.dice1+'.webm" type=\'video/webm; codecs="vp8, vorbis"\'>'
    +'Your browser does not support the video tag.'
    +'</video>'
    +'<video width="320" height="180" autoplay="autoplay" muted="">'
    +'<source src="R-'+data.dice2+'.webm" type=\'video/webm; codecs="vp8, vorbis"\'>'
    +'Your browser does not support the video tag.'
    +'</video>'
	
}


function getDice(num, side) {
    
       // var num = Math.floor(Math.random() * 5) + 1;
        // <source src="L-6.webm" type='video/webm; codecs="vp8, vorbis"'>
        var code = '<source src="' + side + '-' + num + '.webm" type=\'video/webm; codecs="vp8, vorbis"\'>';
        document.write(code);
        document.close();
    
}

function printGame(object, id) {

	var result = JSON.stringify(object);
	document.getElementById(id).innerHTML = result + "<br>";
}

function seeAllPlayers() {

	var constructedUrl = "http://rafelserra.mooo.com/players/";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			print(data, "showList");

		},
		error: function(){
			alert("json not found");
		}
	});


}


function print(objects, id) {

	var result = "";
	if (objects.length>0) {   //.content
		for (var i=0; i<objects.length; i++) { //.content
			if (objects[i].name == null) {  //.content
				objects[i].name = "ANONYMOUS";   //.content
			};
			result += JSON.stringify(objects[i])+"<br>";   //.content
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}

function seeGamesByPlayer() {

	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
		//var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;

		var constructedUrl = "http://rafelserra.mooo.com/players/" + currentPlayer.id + "/games";

		console.log(constructedUrl);

		$.ajax({
			type: "GET",
			url: constructedUrl,
			success: function(data) {

				printGames(data, "showList");

			},
			error: function(){
				alert("json not found");
			}
		});



}


function printGames(objects, id) {

	var result = "";
	if (objects.length>0) { //.content
		for (var i=0; i<objects.length; i++) {   //.content
			//if (objects.content[i].name == null) {
			//	objects.content[i].name = "ANONYMOUS";
			//};
			result += JSON.stringify(objects[i])+"<br>"; //.content
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}

function updatePlayer() {
	
	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
	
	//var editId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
	var editName = document.getElementById("editName").value;
	//var editRole = document.getElementById("editRole")[document.getElementById("editRole").selectedIndex].value;
	//var auth = "Basic " + btoa({usname} + ":" + {password});

	var editPlayer = {
			"name": editName
	}

	 //'{"id":'+editId+'}';

	var constructedURL = "http://rafelserra.mooo.com/players/" + currentPlayer.id; //
	editPlayer = JSON.stringify(editPlayer);
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: constructedURL,
		data: editPlayer, 
		success: function(data) {
			localStorage.setItem("currentPlayer", JSON.stringify(data));
			window.open("http://localhost/dicegame/index_login.html","_self")
		},
		error: function(){
			alert("json not found");
		}
	});
}



function deleteGames() {
	
	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
	//var currentPlayerId = document.getElementById("playerId")[document.getElementById("playerId").selectedIndex].value;
	var constructedUrl = "http://rafelserra.mooo.com/players/" + currentPlayer.id + "/games";
		
		$.ajax({
			type: "DELETE",
			contentType: "application/json",
			url: constructedUrl,
			data: currentPlayer.id, 
			success: function(data) {
				seeGamesByPlayer();

			},
			error: function(){
				alert("json not found");
			}
		});
		

}



function seeAverage() {

	var constructedUrl = "http://rafelserra.mooo.com/players/ranking";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printAverage(data, "showList");

		},
		error: function(){
			alert("json not found");
		}
	});


}

function printAverage(average, id) {


			var result = JSON.stringify(average);

	document.getElementById(id).innerHTML = result;
}

function seeIndividualAverage() {
	var player_id = currentPlayer.id;
	var constructedUrl = "http://rafelserra.mooo.com/players/" + player_id + "/ranking"
	
	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printAverage(data, "showList");

		},
		error: function(){
			alert("json not found");
		}
	});
	
}

function seeLoser() {

	var constructedUrl = "http://rafelserra.mooo.com/players/ranking/loser";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			//printSingleObject(data, "showList");
			printLosersWinners(data, "showList");

		},
		error: function(){
			alert("json not found");
		}
	});


}

function printLosersWinners(objects, id) {

	console.log(JSON.stringify(objects));
	var result = "";
	if (objects.length>0) {
		for (var i=0; i<objects.length; i++) {
			if (objects[i].name == null) {
				objects[i].name = "ANONYMOUS";
			};
			result += JSON.stringify(objects[i])+"<br>";
		}

	}
	else {
		result = "NO RESULTS";
	}
	document.getElementById(id).innerHTML = result;
}

function printSingleObject(object, id) {

	if (object.name == null) {
		object.name = "ANONYMOUS";
	};
	var result = JSON.stringify(object);

document.getElementById(id).innerHTML = result;
}


function seeWinner() {

	var constructedUrl = "http://rafelserra.mooo.com/players/ranking/winner";


	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			printLosersWinners(data, "showList");

		},
		error: function(){
			alert("json not found");
		}
	});


}

function login() {
	var loginName = document.getElementById("loginName").value;
	var successful = false;
	
	
	//confronta amb llista usuaris validats
	
	for (var i=0; i<arrayPlayers.length; i++) {
		if (loginName == arrayPlayers[i].name) {
			//currentPlayer = arrayPlayers[i];
			//successful = true;
			localStorage.setItem("currentPlayer", JSON.stringify(arrayPlayers[i]));
			successful = true;
		}
	}
	
	
	//document.write(successful);
	if (successful) {
		window.open("http://rafelserra.com/dicegame/index_login.html","_self")
	} else {
		document.getElementById("noSuchName").innerHTML="User " + loginName + " doesn't exist in our database. Please try again";
	}
}

function loadNames() {
	var constructedUrl = "http://rafelserra.mooo.com/players/";
// neteja array jugadors:
	arrayPlayers=[];

	$.ajax({
		type: "GET",
		url: constructedUrl,
		success: function(data) {

			manageNames(data);

		},
		error: function(){
			alert("json not found");
		}
	});


}


function loginId() {
	var loginId = document.getElementById("loginId").value;
	var successful = false;
	
	
	//confronta amb llista usuaris validats
	
	for (var i=0; i<arrayPlayers.length; i++) {
		if (loginId == arrayPlayers[i].id) {
			//currentPlayer = arrayPlayers[i];
			//successful = true;
			localStorage.setItem("currentPlayer", JSON.stringify(arrayPlayers[i]));
			successful = true;
		}
	}
	
	
	//document.write(successful);
	if (successful) {
		window.open("http://rafelserra.com/dicegame/index_login.html","_self")
	} else {
		document.getElementById("noSuchId").innerHTML="User wit Id " + loginId + " doesn't exist in our database. Please try again";
	}
}

function manageNames(objects) {
	
	for (var i=0; i<objects.length; i++) { //content.
		arrayPlayers.push(objects[i]); //.content
	}
	//document.getElementById(playerId).innerHTML = options;
	
}

function welcome2() {

var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
console.log("currentplaer:" + currentPlayer);
var name = currentPlayer.name;
if (name==null) {
	name = "ANONYMOUS";
} 

	document.getElementById("welcome").innerHTML="Welcome, " + name + "!";

}


function welcome3() {

	var currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
	console.log("currentplaer:" + currentPlayer);
	var name = currentPlayer.name;
	if (name==null) {
		name = "ANONYMOUS";
	} 

		document.getElementById("welcome3").innerHTML="Player: " + name;

	}

function logout() {
	localStorage.removeItem("currentPlayer");
	window.open("http://rafelserra.com/dicegame/index.html","_self")
}
