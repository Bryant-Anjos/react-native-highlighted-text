import React from 'react'
import type { Text, TextStyle } from 'react-native'
import { Character } from './enums'

export type HighlightedTextStyles = TextStyle[] | Record<string, TextStyle>

export type OnPressHighlighted =
  | ((text: string) => void)[]
  | Record<string, (text: string) => void>
  | undefined

export type HighlightedTextProps = React.ComponentProps<typeof Text> & {
  children: string | string[]
  highlightedTextStyles: HighlightedTextStyles
  characters?: Characters
  onPressHighlighted?: OnPressHighlighted
}

export type CreateStyledElement = (args: {
  text: string
  jsxElement: JSX.Element
  styles?: TextStyle | TextStyle[]
  props: HighlightedTextProps
  onPress?: (text: string) => void
}) => JSX.Element

export type Characters = typeof Character[keyof typeof Character]

export type GenerateRegex = (
  characters: Characters,
) => Record<
  | 'TEXT_WITH_BRACKETS'
  | 'TEXT_AMONG_BRACKETS'
  | 'KEY_VALUE_TEXT'
  | 'KEY_VALUE_NUMBER',
  RegExp
>

export type FormatText = (
  props: HighlightedTextProps,
  regex: ReturnType<GenerateRegex>,
) => JSX.Element

export type RegexCharactersEnum = Record<
  Characters,
  [open: string, close: string]
>
