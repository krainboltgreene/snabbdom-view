/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import specificView from "./"

test(({same, end}) => {
  const selectors = {
    esignature (state) {
      return state.author.email
    },
  }
  const view = ({esignature}) => `Hello, ${esignature}!`
  const state = {
    name: "Kurtis Rainbolt-Greene",
    author: {
      name: "Kurtis Rainbolt-Greene",
      email: "kurtis@rainbolt-greene.online",
    },
  }

  same(
    specificView(selectors)(view)(state),
    "Hello, kurtis@rainbolt-greene.online!"
  )

  end()
})
