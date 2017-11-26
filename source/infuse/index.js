/* eslint-disable max-statements */
import mapValues from "@unction/mapvalues"
import flip from "@unction/flip"

export default function infuse (component: ComponentType): Function {
  return function infuseState (state: StateType): VirtualDOMNodeType {
    if (component instanceof Function) {
      const view = component(state)

      if (view.children instanceof Array) {
        return {
          ...view,
          children: mapValues(flip(infuse)(state))(view.children),
        }
      }

      return view
    }

    if (component.children instanceof Array) {
      return {
        ...component,
        children: mapValues(flip(infuse)(state))(component.children),
      }
    }

    return component
  }
}
