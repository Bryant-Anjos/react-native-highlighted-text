import { regexCharacters } from './regexCharacters'
import type { GenerateRegex } from './types'

export const generateRegex: GenerateRegex = regex => {
  const [open, close] = regexCharacters[regex]

  return {
    TEXT_WITH_BRACKETS: new RegExp(
      `(\\${open}\\${open}.+?\\${close}\\${close})`,
    ),
    TEXT_AMONG_BRACKETS: new RegExp(
      `\\${open}\\${open}(.*)\\${close}\\${close}`,
    ),
    KEY_VALUE: /^\w[,\w]+=\w+/,
  }
}
