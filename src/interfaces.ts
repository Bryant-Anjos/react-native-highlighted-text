import type { Characters } from './types'

export interface RegexCharactersEnum {
  [characters: string]: [open: string, close: string]
}

export interface Regex {
  [name: string]: RegExp
}

export interface CharacterEnum {
  [key: string]: Characters
}
