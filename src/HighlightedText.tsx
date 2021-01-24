import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { formatText } from './formatText'
import { generateRegex } from './generateRegex'
import { Character } from './enums'
import type { HighlightedTextProps } from './types'

const HighlightedText: React.FC<HighlightedTextProps> = (
  props: HighlightedTextProps,
) => {
  const { characters = Character.SQUARE_BRACKETS } = props
  const regex = generateRegex(characters)

  const textFormated = useMemo(
    () => formatText({ ...props, characters }, regex),
    [props, characters, regex],
  )

  return <Text {...props}>{textFormated}</Text>
}

export default HighlightedText
