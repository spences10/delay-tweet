const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config)

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: 'trump'
})

trackStream.on('tweet', log)

function log ( e ) {
  console.log('====================')
  console.log(e.text)
  console.log('====================')
}
