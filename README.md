# snabbdom-view

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

Infuse your snabbdom components with "global" state.

## Usage

So first lets assume we have this setup:

``` javascript
import xstream from "xstream"

function application (state) {
  return p({
    inner: `Hello, world! My name is ${state.author.name}`
  })
}

function cycle (sources) {
  const state = xstream.periodic(1000).of({author: {name: "Kurtis Rainbolt-Greene"}})

  return {
    DOM: state.map(application)
  }
}
const drivers = {
  DOM: makeDOMDriver("body")
}

run(cycle, drivers)
```

We'd see this rendered:

``` html
<body>
  <p>
    Hello, world! My name is Kurtis Rainbolt-Greene!
  </p>
</body>
```

But what if we [want to get more complicated?](https://kurtis.rainbolt-greene.online/functional-view-trees-with-state.html). This is where snabbdom-view comes into play, it gives your components a "global" state that it can opt-into:

``` javascript
import {broadView} from "snabbdom-view"

function application () {
  return broadView((state) => p({
    inner: `Hello, world! My name is ${state.author.name}`
  }))
}
```

And now we make sure our state is passed correctly:

``` javascript
import {infuse} from "snabbdom-view"

function cycle (sources) {
  const state = xstream.periodic(1000).of({author: {name: "Kurtis Rainbolt-Greene"}})

  return {
    DOM: state.map(infuse(application()))
  }
}
```

Of course it's not great to receive all of state, so instead lets try getting only what we need:

``` javascript
import {specificView} from "snabbdom-view"

function application () {
  return specificView(
    {email: state => state.author.email}
  )(
    ({email}) => p({
      inner: `Hello, world! My name is ${email}`
    })
  )
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/snabbdom-view.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/snabbdom-view.svg?maxAge=2592000&style=flat-square
