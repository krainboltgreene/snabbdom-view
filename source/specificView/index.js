import sequence from "@unction/sequence"

export default function specificView (selectors: SelectorType): Function {
  return function specificViewSelector (thunk: ViewType): Function {
    return function specificViewSelectorThunk (state: StateType): VirtualDOMNodeType {
      return thunk(sequence(selectors)(state))
    }
  }
}
