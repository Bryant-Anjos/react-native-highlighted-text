import React from 'react'
import type { Text, TextStyle } from 'react-native'

export type HighlightedTextProps = React.ComponentProps<typeof Text> & {
  children: string | string[]
  highlightedTextStyles?:
    | TextStyle[]
    | {
        [key: string]: TextStyle
      }
}

export type FormatText = (
  props: HighlightedTextProps,
  regex: {
    [name: string]: RegExp
  },
) => JSX.Element
