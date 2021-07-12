import type { TextStyle } from 'react-native'

import type { FormaterBase, FormaterCreation } from './formaterBase'
import type { GenerateRegex, HighlightedTextStyles } from '../types'

export class NormalStyles implements FormaterBase {
  private currentStyle = 0

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
      KEY_VALUE_TEXT,
    } = this.regex

    const textIsHighlighted = TEXT_WITH_BRACKETS.test(text)
    if (!textIsHighlighted) return false

    const textIsKeyValue = text.split(TEXT_AMONG_BRACKETS).some(t => {
      const textIsKeyValueNumber = KEY_VALUE_NUMBER.test(t)
      if (textIsKeyValueNumber) return true

      const textIsKeyValueText = KEY_VALUE_TEXT.test(t)
      if (textIsKeyValueText) return true

      return false
    })

    return !textIsKeyValue
  }

  create(text: string): FormaterCreation {
    const { TEXT_AMONG_BRACKETS } = this.regex
    const pureText = text.replace(TEXT_AMONG_BRACKETS, '$1')
    const style = this.getStyle()

    return {
      text: pureText,
      styles: style,
    }
  }

  private getStyle(): TextStyle | undefined {
    if (this.currentStyle < this.styles.length) {
      const style = (this.styles as TextStyle[])[this.currentStyle]
      this.currentStyle++
      return style
    }
  }
}
