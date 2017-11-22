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
function log(e) {
  console.log('====================')
  tweets.push({
    tweet: e.text,
    timeIn: newTimeIn(),
    timeOut: newTimeOut()
  })
  console.log(tweets)
  console.log('====================')
}

// function to rerurn random 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const newTimeIn = (date) => {
  return moment(date).toDate()
}

const newTimeOut = (date) => {
  return moment(date).add(30, 'm').toDate()  
}