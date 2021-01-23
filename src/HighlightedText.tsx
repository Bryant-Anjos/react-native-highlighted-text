import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { formatText } from './formatText'
import type { HighlightedTextProps } from './types'

const regex = {
  TEXT_WITH_BRACKETS: /(\[\[.+?\]\])/,
  TEXT_AMONG_BRACKETS: /\[\[(.*)\]\]/,
  KEY_VALUE: /^\w[,\w]+=\w+/,
}

const HighlightedText: React.FC<HighlightedTextProps> = (
  props: HighlightedTextProps,
) => {
  const textFormated = useMemo(() => formatText(props, regex), [props])

  return <Text {...props}>{textFormated}</Text>
}

export default HighlightedText
