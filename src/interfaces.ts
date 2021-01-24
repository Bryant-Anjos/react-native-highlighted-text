import type { TextStyle } from 'react-native'
import type { HighlightedTextProps, Characters } from './types'

export interface CreateStyledElement {
  text: string
  jsxElement: JSX.Element
  style?: TextStyle | TextStyle[]
  props: HighlightedTextProps
}

export interface RegexCharactersEnum {
  [characters: string]: [open: string, close: string]
}

export interface Regex {
  [name: string]: RegExp
}

export interface CharacterEnum {
  [key: string]: Characters
}
