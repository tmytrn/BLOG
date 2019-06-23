var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'y7xg5XsfiVwshdIjMpSyIn9mN',
  consumer_secret: 'nXd1ONmCEcgiAxm9vI1MAeRZiuucSKsVJutU978VVBm1Cag4U0',
  access_token_key: '569702193-fmi6L1kj6koJgo5k4gCCXXCTV3wO6A9JQEHmMntQ',
  access_token_secret: 'FYVwuPsDRgB1bKwRk84sxxsX6Ys1yXrVQXLsONyzhnS3W'
});
 
var params = {screen_name: 'tmytrn'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for( i =0; i < tweets.length; i++){
     console.log(tweets[i].text);
    }
  }
});