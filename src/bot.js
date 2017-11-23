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
  tweets.push({
    tweet: e.text,
    timeIn: new Date(newTimeIn()),
    timeOut: new Date(newTimeOut())
  })
  console.log(`popped onto array`)
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

// loop through tweets object
// popp off tweets after time out is matched
setInterval(() => {
  // loop through dem keys
  Object.keys(sortByTimeOut)
  .sort()
  .forEach(key => {
      // if timeOut less than current time then pop it off!
      console.log(tweets[key].timeOut)
    })
  // take tweets and reassign it to the new array

  // console.log(sortByTimeOut)
  // Object.keys(tweets)
  //   .sort()
  //   .forEach(key => {
  //     console.log(key)
  //     console.log(tweets[key])
  //   })
}, 3000)

const sortByTimeOut = tweets.sort((first, second) => {
  return new Date(first.timeOut).getTime() - new Date(second.timeOut).getTime()
})
