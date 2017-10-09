var express = require("express");
var path = require("path");
var app = express();
var friends = require(__dirname+"/../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
	  return res.json(friends);
	});

	app.post("/api/friends", function(req, res) {

		var bestMatch = {
			name: "",
			photo: "",
			matchScore: 40
		};

		var totalDifference = 0;
	  var newFriend = req.body;

	  console.log(newFriend);

	  friends.push(newFriend);
	  res.json(newFriend);

	  for (var i=0;i<friends.length-1;i++){
	  	totalDifference = 0;

	  	for (var j=0;j<10;j++){
	  		totalDifference += Math.abs(parseInt(friends[i].scores[j]) - newFriend.scores[j])
	  		console.log("Total Difference: "+totalDifference)

	  		if (totalDifference<=bestMatch.matchScore){
	  			bestMatch.name = friends[i].name;
	  			bestMatch.photo = friends[i].photo;
	  			bestMatch.matchScore = totalDifference;
	  		}

	  	}
	  }
  });
}



// var greatMatch = {
// 			name: "",
// 			image: "",
// 			matchDifference: 1000
// 		};
// 		var usrData 	= req.body;
// 		var usrName 	= usrData.name;
// 		var usrImage 	= usrData.image;
// 		var usrScores 	= usrData.scores;

// 		var totalDifference = 0;

// 		//loop through the friends data array of objects to get each friends scores
// 		for(var i = 0; i < [friends].length-1; i++){
// 			console.log(friends[i].name);
// 			totalDifference = 0;

// 			//loop through that friends score and the users score and calculate the 
// 			// absolute difference between the two and push that to the total difference variable set above
// 			for(var j = 0; j < 10; j++){
// 				// We calculate the difference between the scores and sum them into the totalDifference
// 				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
// 				// If the sum of differences is less then the differences of the current "best match"
// 				if (totalDifference <= greatMatch.friendDifference){

// 					// Reset the bestMatch to be the new friend. 
// 					greatMatch.name = friends[i].name;
// 					greatMatch.photo = friends[i].photo;
// 					greatMatch.matchDifference = totalDifference;
// 				}
// 			}
// }