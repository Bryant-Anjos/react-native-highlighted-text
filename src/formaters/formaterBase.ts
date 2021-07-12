import type { TextStyle } from 'react-native'

import type {
  GenerateRegex,
  HighlightedTextStyles,
  OnPressHighlighted,
} from '../types'

export type FormaterCreation = {
  text: string
  styles: TextStyle | TextStyle[] | undefined
  onPress: ((text: string) => void) | undefined
}

export interface FormaterBase {
  readonly styles: HighlightedTextStyles
  readonly regex: ReturnType<GenerateRegex>
  readonly pressFunctions: OnPressHighlighted | undefined

  validate(text: string): boolean

  create(text: string): FormaterCreation
}
