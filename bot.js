console.log('Palette alive');

var Twit = require('twit')
var config = require('./config');
var T = new Twit(config);
var exec = require('child_process').exec;
var fs = require("fs");
var indexP = 30

TweetIn();
setInterval(TweetIn, 1000*60*60*4);
//4 hours

function TweetIn() {

	var cmd = "PalitraAlg/PalitraAlg";
	exec(cmd, processing);
	console.log('Generate...');

	function processing() {
		var filename = "PalitraAlg/output.png";
		var params = {
			encoding: 'base64'
		}
		var b64 = fs.readFileSync(filename, params);

		T.post('media/upload', { media_data: b64 }, uploaded);

		function uploaded(err, data, response) {
			var id = data.media_id_string;
			var tweet = {
				status: "Generated color palette #colors #palette",
				media_ids: [id]
			}
			T.post('statuses/update', tweet, tweeted);
		}

	}

	function tweeted(err, data, response){
		if (err){
			console.log('Something went wrong! '+err);
		}else{
			console.log('It worked!');
		}
	}
}
