var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
require('dotenv').config();


var client = new Twitter({
  consumer_key: process.env.TWIT_CONSUMER_KEY,
  consumer_secret: process.env.TWIT_CONSUMER_SECRET,
  access_token_key: process.env.TWIT_ACCESS_KEY,
  access_token_secret: process.env.TWIT_ACCESS_SECRET
});

var tmyParams = { screen_name: 'tmytrn' };
var benParams = { screen_name: 'bensiordia' };

const cleanTweets = (tweets) => {
  let obj = {};
  obj.links = [];
  obj.pics = [];

  for (i = 0; i < tweets.length; i++) {
    if (tweets[i].entities.media) {
      let media = JSON.stringify(tweets[i].entities.media);
      let img = JSON.parse(media.substring(1, media.length - 1));
      let imgLink = img.media_url_https
      let cleanTweet = tweets[i].text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
      let element = {
        description: cleanTweet,
        link: imgLink
      }
      if (!cleanTweet.includes("RT")) {
        obj.pics.push(element);
      }
    } else {
      var tweet = tweets[i].text;
      if (tweet.includes('—')) {
        obj.links.push(tweet);
      }
    }
  }
  return obj;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  client.get('statuses/user_timeline', tmyParams, function (error, tweets, response) {
    if (!error) {
      const cleanedTweets = cleanTweets(tweets);
      res.render('index', { title: 'Chorizzo', tweets: cleanedTweets.links, pictures: cleanedTweets.pics });
    }
  })
});

module.exports = router;
