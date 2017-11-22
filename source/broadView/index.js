import applicator from "@unction/applicator"

export default function broadView (thunk: ViewType): Function {
  return function broadViewStateful (state: StateType): VirtualDOMNodeType {
    return applicator(thunk)(state)
  }
}
