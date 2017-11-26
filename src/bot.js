// listen on port so now.sh likes it
const { createServer } = require('http')

const Twit = require('twit')
const moment = require('moment')

const config = require('./config')
const retweet = require('./api/retweet')
const isReply = require('./helpers/isReply')

const bot = new Twit(config.twitterKeys)

// bring in parameters for search
const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// counter for tweets limit
// detail here: https://support.twitter.com/articles/15364#
const tweetLimit = 2400

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})

trackStream.on('tweet', addTweets)

let tweets = []
let tweetCounter = tweetLimit / 24

setInterval(() => {
  tweetCounter = tweetLimit / 24
  console.log('====================')
  console.log(`Hourly Counter Reset`)
  console.log(`reset counter to ${tweetCounter}`)
  console.log('====================')
}, 1000 * 60 * 60)

// add tweet to object
// e is the tweet event
function addTweets(e) {
  if (isReply(e)) {
    // console.log('====================')
    // console.log(`IS REPLY============`)
    // console.log('====================')
    return
  }
  tweets.push({
    tweet: e.text,
    tweetId: e.id_str,
    user: e.user.screen_name,
    timeIn: newTimeIn(new Date()),
    timeOut: newTimeOut(newTimeIn()),
    event: e // EVERYTHING!!!
  })
  console.log(`Item added to queue, current length=${tweets.length}`)
  // console.log(tweets)
}

// function to rerurn random
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// set timeIn
const newTimeIn = date => moment(date).toDate()

// set timeOut 🙃
const randomMin = parseInt(param.tweetTimeOutMin)
const randomMax = parseInt(param.tweetTimeOutMax)

const newTimeOut = date => {
  const minutesToAdd = getRandomInt(randomMin, randomMax)
  return moment(date)
    .add(minutesToAdd, 'minutes')
    .toDate()
}

// loop through tweets object
// pop off tweets after timeOut is matched
const queueTime = param.tweetQueueTime

setInterval(() => {
  // check counter
  console.log('====================')
  console.log(`TWEET COUNTER=${tweetCounter}`)
  console.log('====================')
  if (tweetCounter === 0) return
  // new array from tweets, right?
  tweets = tweets.slice()
  // sort it
  tweets.sort((a, b) => a.timeOut - b.timeOut)
  // loop through the thing
  tweets.map(item => {
    // console.log(time.timeOut)
    const itemTimeOut = new Date(item.timeOut).getTime()
    const currentTime = new Date().getTime()
    console.log('====================')
    console.log(`ITEM TIME OUT==== ${timeConverter(itemTimeOut)}`)
    console.log(`ITEM TIME NOW==== ${timeConverter(currentTime)}`)
    console.log(`POP IT OFF?====== ${itemTimeOut <= currentTime}`)
    console.log('====================')
    if (itemTimeOut <= currentTime) {
      // item needs 'dispatching' so tweet it
      const itemEvent = item.event
      // console.log(itemEvent)
      retweet(itemEvent)
      // then remove it
      tweets.shift()
      console.log(`Item removed from queue, current length ${tweets.length}`)
      // count down to 0 from the max tweet number = 100
      tweetCounter--
    }
  })
  return tweets
}, queueTime)

// for my own sanity checking of date times 🙃
function timeConverter(UNIX_timestamp) {
  return new Date(UNIX_timestamp).toISOString()
}

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)
