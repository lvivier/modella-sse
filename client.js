
module.exports = function (url, opts) {
  opts = opts || {}

  return function (Model) {
    Model.on('initialize', init)

    // TODO more robust
    url = url || (Model.baseUrl + '/:primary')

    function init (model) {
      if (opts.subscribe) model.subscribe()
    }

    Model.prototype.subscribe = function () {
      var model = this
      var u = url.replace(/:(\w+)/g, function (m, attr) {
        return model[attr]()
      })

      this.sse = new EventSource(u)
      this.sse.addEventListener('change', change)
      this.sse.addEventListener('remove', remove)

      this.emit('subscribe')
      return this

      function change (ev) {
        var obj = JSON.parse(ev.data)
        model.set(obj)
      }

      function remove () {
        model.removed = true
        model.emit('remove')
      }
    }

    Model.prototype.unsubscribe = function () {
      this.sse.close()
      this.emit('unsubscribe')
      return this
    }
  }
}
