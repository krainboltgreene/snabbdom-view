/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import broadView from "./"

test(({same, end}) => {
  const view = ({author: {email}}) => `Hello, ${email}!`
  const state = {
    name: "Kurtis Rainbolt-Greene",
    author: {
      name: "Kurtis Rainbolt-Greene",
      email: "kurtis@rainbolt-greene.online",
    },
  }

  same(
    broadView(view)(state),
    "Hello, kurtis@rainbolt-greene.online!"
  )

  end()
})
