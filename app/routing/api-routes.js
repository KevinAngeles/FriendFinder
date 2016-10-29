// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData 	= require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------
	app.get('/api/friends', function (req, res)
	{
		res.json(friendsData);
	});
	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// ---------------------------------------------------------------------------
	app.post('/api/friends', function (req, res)
	{
		// Get new friend to be inserted in the server
		var newFriend = req.body;
		// The matched friend will be saved in the following variable
		var selectedFriend = {};
		var diffScore = 0;
		// For each data 
		console.log(friendsData);

		for( var f = 0; f < friendsData.length; f++ )
		{
			var tmpDiffScore = 0;
			for( var s = 0; s < friendsData[f].scores.length; s++)
			{
				tmpDiffScore = tmpDiffScore + Math.abs( parseInt(friendsData[f].scores[s]) - parseInt(newFriend.scores[s]) ); 
			}
			//If no friend have been selected yet
			if( f === 0 )
			{
				selectedFriend = friendsData[f];
				diffScore = tmpDiffScore
			}
			//If there was already a friend selected
			else if( tmpDiffScore < diffScore )
			{
				//change that friend for a better friend
				selectedFriend = friendsData[f];
				diffScore = tmpDiffScore;
			}
		};
		// Push the new data (After matching a friend)
		friendsData.push(req.body);
		// Return matched friend
		res.json(selectedFriend);
	});
	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!
	app.post('/api/clear', function ()
	{
		// Empty out the arrays of data
		friendsData = [];

		console.log(friendsData);
	});
};