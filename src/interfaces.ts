import type { TextStyle } from 'react-native'
import type { HighlightedTextProps } from './types'

export interface CreateStyledElement {
  text: string
  jsxElement: JSX.Element
  style?: TextStyle | TextStyle[]
  props: HighlightedTextProps
}
