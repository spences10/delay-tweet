const Twit = require('twit')
const moment = require('moment')

const config = require('./config')

const bot = new Twit(config)

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: 'javascript'
})

trackStream.on('tweet', log)

let tweets = []

// add tweet to object
// e is the tweet event
function log(e) {
  console.log('====================')
  tweets.push({
    tweet: e.text,
    timeIn: newTimeIn(),
    timeOut: newTimeOut()
  })
  // console.log(tweets)
  console.log('====================')
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
    .add(getRandomInt(1, 30), 'm')
    .toDate()
}

setInterval(function(tweets) {
  Object.keys(tweets).forEach(key => {
    console.log(key, tweets[key])
  })
}, 3000)

// loop through tweets object
// popp off tweets after time out is matched
// function tweetList(tweets) {
//   Object.keys(tweets).forEach(key => {
//     console.log(key, tweets[key])
//   })
// }
