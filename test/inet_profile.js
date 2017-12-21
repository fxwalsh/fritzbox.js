const fritz = require('../index.js')
var options = require('../package.json').options
require('dotenv').config()

options.username = process.env.FRITZ_USER || options.username
options.password =  process.env.FRITZ_pass || options.password
 
;(async () => {
 
  const result = await fritz.setNeverStandardAccess(options)
  if (result.error) return console.log('sError: ' + result.error.message)
  console.log('Got '+result)
 
})()