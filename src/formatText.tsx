import React from 'react'
import { Text } from 'react-native'
import type { FormatText } from './types'
import type { CreateStyledElement } from './interfaces'

const createStyledElement = ({
  text,
  style,
  jsxElement,
  props,
}: CreateStyledElement) => (
  <>
    {jsxElement}
    <Text {...props} style={[props.style, style]}>
      {text}
    </Text>
  </>
)

export const formatText: FormatText = (props, regex) => {
  const { children, highlightedTextStyles } = props
  const { TEXT_WITH_BRACKETS, TEXT_AMONG_BRACKETS, KEY_VALUE } = regex

  let currentStyleIndex = 0
  const allText = Array.isArray(children) ? children.join() : children
  const textArray = allText.split(TEXT_WITH_BRACKETS)

  const finalTextElement = textArray.reduce((jsxElement, text) => {
    if (TEXT_WITH_BRACKETS.test(text)) {
      const pureText = text.replace(TEXT_AMONG_BRACKETS, '$1')

      if (!highlightedTextStyles) {
        return createStyledElement({ text: pureText, jsxElement, props })
      }

      if (Array.isArray(highlightedTextStyles)) {
        const style = highlightedTextStyles[currentStyleIndex]
        currentStyleIndex += 1
        return createStyledElement({ text: pureText, jsxElement, style, props })
      }

      const keyAndText = KEY_VALUE.test(pureText)
        ? pureText.split('=')
        : undefined
      const keys = keyAndText && keyAndText[0].split(',')

      if (keyAndText && keys) {
        const styles = keys.map(key => highlightedTextStyles[key])
        const finalText = keyAndText[1]
        return createStyledElement({
          text: finalText,
          jsxElement,
          style: styles,
          props,
        })
      }

      return createStyledElement({ text: pureText, jsxElement, props })
    }

    return (
      <>
        {jsxElement}
        {text}
      </>
    )
  }, <></>)

  return finalTextElement
}
