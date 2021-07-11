import type { TextStyle } from 'react-native'

import type { FormaterBase, FormaterCreation } from './formaterBase'
import type { GenerateRegex, HighlightedTextStyles } from '../types'

export class NamedStyles implements FormaterBase {
  constructor(
    readonly styles: HighlightedTextStyles,
    readonly regex: ReturnType<GenerateRegex>,
  ) {}

  validate(text: string): boolean {
    const stylesIsObject =
      typeof this.styles === 'object' && !Array.isArray(this.styles)
    if (!stylesIsObject) return false

    const {
      TEXT_AMONG_BRACKETS,
      TEXT_WITH_BRACKETS,
      KEY_VALUE_TEXT,
    } = this.regex

    const textIsHighlighted = TEXT_WITH_BRACKETS.test(text)
    if (!textIsHighlighted) return false

    const textIsKeyValue = text.split(TEXT_AMONG_BRACKETS).some(t => {
      const textIsKeyValueText = KEY_VALUE_TEXT.test(t)
      return textIsKeyValueText
    })

    return textIsKeyValue
  }

  create(text: string): FormaterCreation {
    const { TEXT_AMONG_BRACKETS } = this.regex
    const pureText = text.replace(TEXT_AMONG_BRACKETS, '$1')
    const keysAndText = pureText.split('=')
    const keys = keysAndText[0].split(',')
    const styles = keys.map(
      key => (this.styles as Record<string, TextStyle>)[key],
    )
    const finalText = keysAndText[1]

    return {
      text: finalText,
      styles,
    }
  }
}
