require('dotenv').config()

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
