import mapValues from "@unction/mapvalues"
import arrayify from "@unction/arrayify"
import flip from "@unction/flip"
import isType from "@unction/istype"

const isNull = isType("null")
const isUndefined = isType("undefined")

export default function infuse (component: ComponentType): Function {
  return function infuseState (state: StateType): VirtualDOMNodeType {
    if (component instanceof Function) {
      const view = component(state)

      if (isNull(view.children) || isUndefined(view.children)) {
        return view
      }

      return {
        ...view,
        children: mapValues(flip(infuse)(state))(arrayify(view.children)),
      }
    }

    if (isNull(component.children) || isUndefined(component.children)) {
      return component
    }

    return {
      ...component,
      children: mapValues(flip(infuse)(state))(arrayify(component.children)),
    }
  }
}
