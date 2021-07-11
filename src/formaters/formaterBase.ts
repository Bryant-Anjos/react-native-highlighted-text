import type { TextStyle } from 'react-native'

import type { GenerateRegex, HighlightedTextStyles } from '../types'

export type FormaterCreation = {
  text: string
  styles: TextStyle | TextStyle[] | undefined
}

export interface FormaterBase {
  readonly styles: HighlightedTextStyles
  readonly regex: ReturnType<GenerateRegex>

  validate(text: string): boolean

  create(text: string): FormaterCreation
}
