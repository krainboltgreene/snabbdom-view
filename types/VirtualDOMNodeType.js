export type VirtualDOMNodeType = {
  sel?: string | null,
  children?: Array<VirtualDOMNodeType | string> | null,
  text?: string | null,
}
