/**
 * Fritz!Inet functions.
 * @module fritzInet
 */

let fritzInet = {}

const fritzLogin = require('./login.js')
const fritzRequest = require('./request.js')

/**
 * Set full Inet access.
 * @param  {Object} options - FritzBox.js options object.
 * @return {Array} Returns an array of active calls.
 */
fritzInet.setUnlimitedStandardAccess = async (options) => {
  if (!options.sid) {
    options.sid = await fritzLogin.getSessionId(options)
    if (options.sid.error) return options.sid
  }
  options.removeSidFromUri = true
  const form1 = {
    sid: options.sid,
    back_to_page:'/internet/kids_profilelist.lua',
    edit:'filtprof1',
    time:'unlimited',
    netappschosen: '',
    choosenetapps:'choose',
    validate:'apply',
    xhr:1
  }
  const response = await fritzRequest.request('/internet/kids_profileedit.lua', 'POST', options, false, false, form1)
  if (response.error) return response

const form2 = {
    sid: options.sid,
    back_to_page:'/internet/kids_profilelist.lua',
    edit:'filtprof1',
    time:'unlimited',
    oldpage:'/internet/kids_profileedit.lua',
    lang:'en',
    timer_complete:0,
    no_sidrenew:'',
    apply:'',
     netappschosen: '',
    choosenetapps:'choose',
    //validate:'apply',
    xhr:1
  }
  const response2 = await fritzRequest.request('/data.lua', 'POST', options, false, false, form2)
  if (response2.error) return response
  //const result = JSON.parse(response.body).data.foncalls.activecalls
  
  return response2.body
}

/**
 * Set full Inet access.
 * @param  {Object} options - FritzBox.js options object.
 * @return {Array} Returns an array of active calls.
 */
fritzInet.setNeverStandardAccess = async (options) => {
  if (!options.sid) {
    options.sid = await fritzLogin.getSessionId(options)
    if (options.sid.error) return options.sid
  }

  options.removeSidFromUri = true
  const form1 = {
    sid: options.sid,
    back_to_page:'/internet/kids_profilelist.lua',
    edit:'filtprof1',
    time:'never',
     netappschosen: '',
    choosenetapps:'choose',
    validate:'apply',
    xhr:1
  }
  const response = await fritzRequest.request('/internet/kids_profileedit.lua', 'POST', options, false, false, form1)
  if (response.error) return response

const form2 = {
    sid: options.sid,
    back_to_page:'/internet/kids_profilelist.lua',
    edit:'filtprof1',
    time:'never',
    oldpage:'/internet/kids_profileedit.lua',
    lang:'en',
    timer_complete:1,
    no_sidrenew:'',
    apply:'',
     netappschosen: '',
    choosenetapps:'choose',
    xhr:1
  }
  const response2 = await fritzRequest.request('/data.lua', 'POST', options, false, false, form2)
  if (response2.error) return response
  //const result = JSON.parse(response.body).data.foncalls.activecalls
  return response2.body
}



// Export fritzFon.

module.exports = fritzInet
