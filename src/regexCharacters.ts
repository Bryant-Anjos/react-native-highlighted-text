import { RegexCharactersEnum } from './interfaces'
import { Character } from './enums'

export const regexCharacters: RegexCharactersEnum = {
  [Character.SQUARE_BRACKETS]: ['[', ']'],
  [Character.CURLY_BRACKETS]: ['{', '}'],
  [Character.TAGS]: ['<', '>'],
  [Character.PARENTHESIS]: ['(', ')'],
}
