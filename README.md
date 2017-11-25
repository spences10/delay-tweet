# deleay tweet

[![Greenkeeper badge](https://badges.greenkeeper.io/spences10/delay-tweet.svg)](https://greenkeeper.io/)

This is going to be a bot that uses the `stream.on` method and pops what comes out of the that into an array object:

```javascript
obj {
  tweet: someTweet,
  timestamp: timestamp,
  delay: timestamp + delay
}
```

Uses `twit` and needs configuring with a `.env` file to reflect the config file:

```javascript
module.exports = {
  twitterKeys: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    queryString: process.env.QUERY_STRING,
    username: process.env.TWITTER_USERNAME,
    tweetTimeOutMin: process.env.TWEET_TIME_OUT_MIN,
    tweetTimeOutMax: process.env.TWEET_TIME_OUT_MAX,
    tweetQueueTime: process.env.TWEET_QUEUE_TIME,
    username: process.env.TWITTER_USERNAME,
  }
}
```

The `.env` will need to look as follows:


```
CONSUMER_KEY=...
CONSUMER_SECRET=...
ACCESS_TOKEN=...
ACCESS_TOKEN_SECRET=...
QUERY_STRING=...
TWITTER_USERNAME=...
TWEET_TIME_OUT_MIN=...
TWEET_TIME_OUT_MAX=...
TWEET_QUEUE_TIME=...
TWITTER_USERNAME=...
```
