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
    .add(getRandomInt(1, 2), 'm')
    .toDate()
}

// loop through tweets object
// popp off tweets after time out is matched
setInterval(() => {
  // loop through the thing
  console.log('====================')
  console.log(sortByTimeOut)
  console.log('====================')

  sortByTimeOut.sort((a, b) => a.timeOut - b.timeOut)
  sortByTimeOut.map(item => {
    // console.log(time.timeOut)
    const itemTimeOut = new Date(item.timeOut)
    const currentTime = new Date().getTime()
    console.log('====================')
    console.log(`ITEM TIME OUT==== ${itemTimeOut}`)
    console.log(`ITEM TIME NOW==== ${currentTime}`)
    console.log(itemTimeOut.getTime() <= currentTime)
    console.log('====================')
    if (itemTimeOut.getTime() <= currentTime) {
      // console.log(`Item to pop off!============${item.tweet}`)
    }
  })

  // Object.keys(sortByTimeOut)
  //   .sort()
  //   .forEach(key => {
  //   // if timeOut less than current time then pop it off!
  //   const keyTimeOut = tweets[key].timeOut
  //   const keyTimeIn = tweets[key].timeIn
  //   console.log('====================')
  //   console.log(`KEY TIME OUT==== ${keyTimeOut}`)
  //   console.log(`KEY TIME IN===== ${keyTimeIn}`)
  //   console.log('====================')
  //   console.log(keyTimeOut, keyTimeOut.getTime() <= new Date().getTime())
  // })
  // take tweets and reassign it to the new array

  // console.log(sortByTimeOut)
  // Object.keys(tweets)
  //   .sort()
  //   .forEach(key => {
  //     console.log(key)
  //     console.log(tweets[key])
  //   })
}, 20000)

const sortByTimeOut = tweets.sort((a, b) => {
  return new Date(a.timeOut).getTime() - new Date(b.timeOut).getTime()
})
