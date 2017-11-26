/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import {main} from "snabbdom-helpers"
import {section} from "snabbdom-helpers"
import {footer} from "snabbdom-helpers"
import {header} from "snabbdom-helpers"
import {img} from "snabbdom-helpers"
import {p} from "snabbdom-helpers"

import {infuse} from "./"
import {specificView} from "./"
import {broadView} from "./"

const authorSignature = () => specificView(
  {
    email: (state) => state.author.email,
    name: (state) => state.author.name,
  }
)(
  ({email, name}) => p({children: [`My name is ${name}`, `My email is ${email}`]})
)

const navigation = () => broadView(({name}) => {
  return header({children: `Hello, ${name}.`})
})

const welcome = () => () => {
  return p({children: "Welcome to the front page"})
}

const frontPage = () => {
  return section({children: welcome()})
}

const information = () => {
  return footer({
    children: [
      "Check me out on mastodon.social",
      authorSignature(),
      img(),
    ],
  })
}

const application = () => {
  return main({
    children: [
      navigation(),
      frontPage(),
      information(),
    ],
  })
}

test(({same, end}) => {
  const state = {
    name: "Kurtis Rainbolt-Greene",
    author: {
      name: "Kurtis Rainbolt-Greene",
      email: "kurtis@rainbolt-greene.online",
    },
  }

  same(
    infuse(application())(state),
    main({
      children: [
        header({children: "Hello, Kurtis Rainbolt-Greene."}),
        section({children: p({children: "Welcome to the front page"})}),
        footer({
          children: [
            "Check me out on mastodon.social",
            p({
              children: [
                "My name is Kurtis Rainbolt-Greene",
                "My email is kurtis@rainbolt-greene.online",
              ],
            }),
            img(),
          ],
        }),
      ],
    })
  )

  end()
})
