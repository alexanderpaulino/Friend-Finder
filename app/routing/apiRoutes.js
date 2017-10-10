//bringing in the friends array for referencing and pushing new user data to it.
var friends = require(__dirname+"/../data/friends.js");

//exporting the api routes for use in server.js 
module.exports = function(app){

	app.get("/api/friends", function(req, res) {
	  return res.json(friends);
	});

	app.post("/api/friends", function(req, res) {

		//This object will hold the data for our best match after the for loops below. It will then be sent back to survey.html
		//so it can be displayed in the modal.

		var bestMatch = {
			name: "",
			photo: "",
			matchScore: 40
		};

		//Declaring a new variable to measure the total difference between new user responses 
		//and previously stored user responses.

		var totalDifference = 0;
	  
	  //This object is receiving the name, photo, and scores from survey html after a user has completed it. Thanks for a
	  //knowledgeable TA, I learned that I had to convert the scores property below in order for it to be properly referenced
	  //later on.
		var newFriend= {
		    name: req.body.name,
		    photo: req.body.photo,
		    scores: req.body["scores[]"]
		  }

		//This pushes the newfriend object to the friends array, storing their data and creating a more robust set of
		//friends to compare against for more accurate results.
	  friends.push(newFriend);

	  //These for loops navigate through the friend array and each friend's scores. Then we compare those scores against
	  //the user's scores and update the bestMatch object. Most important, each time the loop is run, the
	  //matchScore is updated every time a friend in the array has a lower totalDifference number. If all
	  //answers match perfectly, their totalDifference would be 0. If each answer is in total disagreement with every question
	  //the worst possible match would have a total difference of 40, hence the matchScore starting at 40.
	  for (var i=0;i<(friends.length-1);i++){
	  	totalDifference = 0;

	  	for (var j=0;j<friends[i].scores.length;j++){
	  		totalDifference += Math.abs(friends[i].scores[j] - newFriend.scores[j])
	  		}
	  	if (totalDifference<=bestMatch.matchScore){
	  			bestMatch.name = friends[i].name;
	  			bestMatch.photo = friends[i].photo;
	  			bestMatch.matchScore = totalDifference;
	  		}
	  }

	  //And finally this pushes the bestMatch object to survey.html after the for loops above have determined the best match to
	  //the user's answers. 
	  res.json(bestMatch);

  });
}