
# modella-sse

Real time model updates over HTTP with EventSource.


## Installation

With [npm(1)](https://www.npmjs.org):

```
$ npm install lvivier/modella-sse
```

With [component(1)](https://github.com/component/component):

```
$ npm install lvivier/modella-sse
```


## Usage

**modella-sse** comes in two parts, a [modella](https://github.com/modella/modela) plugin for the browser and an Express/Connect middleware.

```
TODO usage example
```

## API

### model([opts])

Modella plugin. Pass the return value to `Model.use()`. `opts` include:

- **subscribe:true** automatically subscribe model instances.

### Model#subscribe()

Subscribe to updates.

### Model#unsubscribe()

Unsubscribe from updates.


## Middleware

TODO middleware docs
