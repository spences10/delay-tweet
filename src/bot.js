const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config)

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: 'javascript'
})

trackStream.on('tweet', log)

let thing = []

// add tweet to object
function log ( e ) {
  // thing.push(e.text)
  
  console.log('====================')
  thing.push({
    tweet: e.text,
    timeIn: Date(),
    timeOut: `Some other Date`
  })
  console.log(thing)
  console.log('====================')

}
