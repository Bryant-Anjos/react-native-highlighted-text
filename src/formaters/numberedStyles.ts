import type { TextStyle } from 'react-native'

import type { FormaterBase, FormaterCreation } from './formaterBase'
import type {
  GenerateRegex,
  HighlightedTextStyles,
  OnPressHighlighted,
} from '../types'

type PressFunctions = ((text: string) => void)[] | undefined

export class NumberedStyles implements FormaterBase {
  constructor(
    readonly styles: HighlightedTextStyles,
    readonly regex: ReturnType<GenerateRegex>,
    readonly pressFunctions: OnPressHighlighted,
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
    const [finalText, styles, onPress] = this.getProperties(pureText)

    return {
      text: finalText,
      styles,
      onPress,
    }
  }

  private getProperties(
    value: string,
  ): [
    text: string,
    styles: TextStyle[],
    onPress: ((text: string) => void) | undefined,
  ] {
    const [key, text] = value.split('=')
    const keys = key
      .split(',')
      .map(stringNumbers => parseInt(stringNumbers) - 1)
    const styles = keys.map(key => (this.styles as TextStyle[])[key])
    const onPress = this.getOnPress(keys)
    return [text, styles, onPress]
  }

  private getOnPress(keys: number[]): ((text: string) => void) | undefined {
    const key = keys.find(
      value => (this.pressFunctions as PressFunctions)?.[value] !== undefined,
    )
    const onPress =
      key !== undefined
        ? (this.pressFunctions as PressFunctions)?.[key]
        : undefined
    return onPress
  }
}
