import applicator from "@unction/applicator"

export default function view (thunk: ViewType): Function {
  return function viewStateful (state: StateType): VirtualDOMNodeType {
    return applicator(thunk)(state)
  }
}
