/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-undefined */
import {test} from "tap"

import {main} from "snabbdom-helpers"
import {section} from "snabbdom-helpers"
import {footer} from "snabbdom-helpers"
import {header} from "snabbdom-helpers"
import {img} from "snabbdom-helpers"
import {p} from "snabbdom-helpers"

import infuse from "./"

test(({same, end}) => {
  const application = () => {
    return main({
      children: [
        ({name}) => header({children: `Hello, ${name}.`}),
        section({children: [p({children: "Welcome to the front page"})]}),
        ({social}) => footer({
          children: [
            `Check me out on ${social}`,
            ({author: {name, email}}) => p({children: [`My name is ${name}`, `My email is ${email}`]}),
            img(),
          ],
        }),
      ],
    })
  }
  const state = {
    name: "Kurtis Rainbolt-Greene",
    social: "mastodon.social",
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

test("null in children", ({same, end}) => {
  const application = () => p({children: ["test", null, "test"]})
  const state = {name: "Kurtis Rainbolt-Greene"}

  same(
    infuse(application())(state),
    p({children: ["test", null, "test"]})
  )

  end()
})

test("null from infuse", ({same, end}) => {
  const application = () => p({children: ["test", () => null, "test"]})
  const state = {name: "Kurtis Rainbolt-Greene"}

  same(
    infuse(application())(state),
    p({children: ["test", null, "test"]})
  )

  end()
})
