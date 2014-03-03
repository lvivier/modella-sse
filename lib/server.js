
/**
 * Dependencies
 */
var uid = require('uid')

/**
 * Subscription
 */
module.exports = function (opts) {

  opts = opts || {}

  /**
   * this key should contain the model instance
   */
  var key = opts.key || 'obj'

  /**
   * Subscription middleware
   */
  return function subscribe (req, res, next) {
    if (!req[key]) return next('route')

    var model = req[key]
    model.subscribe()

    head(res)

    model.on('change _id', function () {
      event(res, 'change', model.attrs)
    })

    model.on('remove', function () {
      event(res, 'remove')
      model.unsubscribe()
    })

    req.on('close', function () {
      model.unsubscribe()
    })
  }
}

function event (res, type, data) {
  res.write('id: '+uid(6)+'\n')
  res.write('event: '+type+'\n')
  res.write('data: '+JSON.stringify(data)+'\n\n')
}

function head (res) {    
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
}
