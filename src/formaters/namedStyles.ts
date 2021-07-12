import type { TextStyle } from 'react-native'

import type { FormaterBase, FormaterCreation } from './formaterBase'
import type {
  GenerateRegex,
  HighlightedTextStyles,
  OnPressHighlighted,
} from '../types'

type PressFunctions = Record<string, (text: string) => void> | undefined

export class NamedStyles implements FormaterBase {
  constructor(
    readonly styles: HighlightedTextStyles,
    readonly regex: ReturnType<GenerateRegex>,
    readonly pressFunctions: OnPressHighlighted,
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
    const keys = key.split(',')
    const styles = keys.map(
      key => (this.styles as Record<string, TextStyle>)[key],
    )
    const onPress = this.getOnPress(keys)
    return [text, styles, onPress]
  }

  private getOnPress(keys: string[]): ((text: string) => void) | undefined {
    const key =
      keys.find(
        value => (this.pressFunctions as PressFunctions)?.[value] !== undefined,
      ) ?? ''
    const onPress = (this.pressFunctions as PressFunctions)?.[key]
    return onPress
  }
}
