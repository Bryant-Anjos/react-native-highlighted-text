import React from 'react'
import type { Text, TextStyle } from 'react-native'
import type { Regex } from './interfaces'

export type HighlightedTextProps = React.ComponentProps<typeof Text> & {
  children: string | string[]
  highlightedTextStyles?:
    | TextStyle[]
    | {
        [key: string]: TextStyle
      }
  characters?: Characters
}

export type CreateStyledElement = (args: {
  text: string
  jsxElement: JSX.Element
  style?: TextStyle | TextStyle[]
  props: HighlightedTextProps
}) => JSX.Element

export type FormatText = (
  props: HighlightedTextProps,
  regex: Regex,
) => JSX.Element

export type Characters =
  | 'square-brackets'
  | 'curly-brackets'
  | 'tags'
  | 'parenthesis'

export type GenerateRegex = (characters: Characters) => Regex
