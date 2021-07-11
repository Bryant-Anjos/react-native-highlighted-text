import React from 'react'
import { Text } from 'react-native'

import formaters from './formaters'
import type { CreateStyledElement, FormatText } from './types'

const createStyledElement: CreateStyledElement = ({
  text,
  styles,
  jsxElement,
  props,
}) => (
  <>
    {jsxElement}
    <Text {...props} style={[props.style, styles]}>
      {text}
    </Text>
  </>
)

export const formatText: FormatText = (props, regex) => {
  const { children, highlightedTextStyles } = props
  const { TEXT_WITH_BRACKETS, TEXT_AMONG_BRACKETS } = regex
  const allText = Array.isArray(children) ? children.join() : children
  const formater = formaters
    .map(Formater => new Formater(highlightedTextStyles, regex))
    .find(Formater => Formater.validate(allText))

  if (!formater) return <>{allText}</>

  const textArray = allText.split(TEXT_WITH_BRACKETS)
  const finalTextElement = textArray.reduce((jsxElement, partialText) => {
    if (TEXT_AMONG_BRACKETS.test(partialText)) {
      const { text, styles } = formater.create(partialText)
      return createStyledElement({ text, styles, jsxElement, props })
    }

    return createStyledElement({ text: partialText, jsxElement, props })
  }, <></>)

  return <>{finalTextElement}</>
}
