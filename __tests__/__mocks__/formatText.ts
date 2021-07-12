import type { TextStyle } from 'react-native'

import type { FormaterBase } from '../../src/formaters/formaterBase'
import type { GenerateRegex } from '../../src/types'

type FormatText = (
  text: string,
  regex: ReturnType<GenerateRegex>,
  formater: FormaterBase,
) => {
  text: string
  styles: (TextStyle | TextStyle[])[]
}

export const formatText: FormatText = (text, regex, formater) =>
  text.split(regex.TEXT_WITH_BRACKETS).reduce<ReturnType<FormatText>>(
    (prev, curr) => {
      if (regex.TEXT_AMONG_BRACKETS.test(curr)) {
        const result = formater.create(curr)
        return {
          text: prev.text + result.text,
          styles: [...prev.styles, result.styles],
        }
      }
      return {
        ...prev,
        text: prev.text + curr,
      }
    },
    {
      text: '',
      styles: [],
    },
  )
