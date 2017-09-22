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
  ({email, name}) => p({inner: [`My name is ${name}`, `My email is ${email}`]})
)

const navigation = () => broadView(({name}) => {
  return header({inner: `Hello, ${name}.`})
})

const frontPage = () => {
  return section({inner: "Welcome to the front page"})
}

const information = () => {
  return footer({
    inner: [
      "Check me out on mastodon.social",
      authorSignature(),
      img(),
    ],
  })
}

const application = () => {
  return main({
    inner: [
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
      inner: [
        header({inner: "Hello, Kurtis Rainbolt-Greene."}),
        section({inner: "Welcome to the front page"}),
        footer({
          inner: [
            "Check me out on mastodon.social",
            p({
              inner: [
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
