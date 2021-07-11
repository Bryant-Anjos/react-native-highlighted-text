import type { TextStyle } from 'react-native'

import type { FormaterBase, FormaterCreation } from './formaterBase'
import type { GenerateRegex, HighlightedTextStyles } from '../types'

export class NumberedStyles implements FormaterBase {
  constructor(
    readonly styles: HighlightedTextStyles,
    readonly regex: ReturnType<GenerateRegex>,
  ) {}

  validate(text: string): boolean {
    const stylesIsArray = Array.isArray(this.styles)
    if (!stylesIsArray) return false

    const {
      TEXT_AMONG_BRACKETS,
      TEXT_WITH_BRACKETS,
      KEY_VALUE_NUMBER,
    } = this.regex

    const textIsHighlighted = TEXT_WITH_BRACKETS.test(text)
    if (!textIsHighlighted) return false

    const textIsKeyValue = text.split(TEXT_AMONG_BRACKETS).some(t => {
      const textIsKeyValueNumber = KEY_VALUE_NUMBER.test(t)
      return textIsKeyValueNumber
    })

    return textIsKeyValue
  }

  create(text: string): FormaterCreation {
    const { TEXT_AMONG_BRACKETS } = this.regex
    const pureText = text.replace(TEXT_AMONG_BRACKETS, '$1')
    const keysAndText = pureText.split('=')
    const keys = keysAndText[0]
      .split(',')
      .map(stringNumbers => parseInt(stringNumbers) - 1)
    const styles = keys.map(key => (this.styles as TextStyle[])[key])
    const finalText = keysAndText[1]

    return {
      text: finalText,
      styles,
    }
  }
}
