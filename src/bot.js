// listen on port so now.sh likes it
const { createServer } = require('http')

const Twit = require('twit')
const moment = require('moment')

const config = require('./config')
const retweet = require('./api/retweet')

const bot = new Twit(config)

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: 'javascript'
})

trackStream.on('tweet', addTweets)

let tweets = []

// add tweet to object
// e is the tweet event
function addTweets(e) {
  // console.log('====================')
  // console.log(e)
  // console.log('====================')
  tweets.push({
    tweet: e.text,
    tweetId: e.id_str,
    user: e.user.screen_name,
    timeIn: new Date(newTimeIn()),
    timeOut: new Date(newTimeOut()),
    event: e // EVERYTHING!!! 
  })
  console.log(`Item added to array, current length=${tweets.length}`)
  // console.log(tweets)
}

// function to rerurn random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// set timeIn
const newTimeIn = date => {
  return moment(date).toDate()
}

// set timeOut 🙃
const newTimeOut = date => {
  return moment(date)
    .add(getRandomInt(10, 20), 'm')
    .toDate()
}

// loop through tweets object
// popp off tweets after time out is matched

setInterval(() => {
  // new array from tweets, right?
  tweets = tweets.slice()
  // sort it 
  tweets.sort((a, b) => a.timeOut - b.timeOut)
  // loop through the thing
  tweets.map(item => {
    // console.log(time.timeOut)
    const itemTimeOut = new Date(item.timeOut).getTime()
    const currentTime = new Date().getTime()
    // console.log('====================')
    // console.log(`ITEM TIME OUT==== ${timeConverter(itemTimeOut)}`)
    // console.log(`ITEM TIME NOW==== ${timeConverter(currentTime)}`)
    // console.log(`POP IT OFF?====== ${itemTimeOut <= currentTime}`)
    // console.log('====================')
    if (itemTimeOut <= currentTime) {
      // item needs 'dispatching' so tweet it
      const itemEvent = item.event
      // console.log(itemEvent)
      retweet(itemEvent)
      // then remove it
      tweets.shift()
      console.log(`Item removed from array, current length ${tweets.length}`)
    }
  })
  return tweets
}, 1000 * 60 * 10)

// for my own sanity checking of date times 🙃
function timeConverter(UNIX_timestamp) {
  return new Date(UNIX_timestamp).toISOString()
}

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/droidscott`
  })
  res.end()
})

server.listen(3000)
