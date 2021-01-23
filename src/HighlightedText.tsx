import React, { useMemo } from 'react'
import { Text } from 'react-native'
import type { TextStyle } from 'react-native'

type HighlightedTextProps = React.ComponentProps<typeof Text> & {
  children: string | string[]
  highlightedTextStyles?:
    | TextStyle[]
    | {
        [key: string]: TextStyle
      }
}

interface CreateStyledElement {
  text: string
  jsxElement: JSX.Element
  style?: TextStyle | TextStyle[]
}

const TEXT_WITH_BRACKETS = /(\[\[.+?\]\])/
const TEXT_AMONG_BRACKETS = /\[\[(.*)\]\]/
const KEY_VALUE = /^\w[,\w]+=\w+/

const HighlightedText: React.FC<HighlightedTextProps> = (
  props: HighlightedTextProps,
) => {
  const { children, highlightedTextStyles = [] } = props

  const textFormated = useMemo(() => {
    let currentStyleIndex = 0
    const allText = Array.isArray(children) ? children.join() : children
    const textArray = allText.split(TEXT_WITH_BRACKETS)
    const createStyledElement = ({
      text,
      style,
      jsxElement,
    }: CreateStyledElement) => (
      <>
        {jsxElement}
        <Text {...props} style={[props.style, style]}>
          {text}
        </Text>
      </>
    )

    const finalTextElement = textArray.reduce((jsxElement, text) => {
      if (TEXT_WITH_BRACKETS.test(text)) {
        const pureText = text.replace(TEXT_AMONG_BRACKETS, '$1')

        if (!highlightedTextStyles) {
          return createStyledElement({ text: pureText, jsxElement })
        }

        if (Array.isArray(highlightedTextStyles)) {
          const style = highlightedTextStyles[currentStyleIndex]
          currentStyleIndex += 1
          return createStyledElement({ text: pureText, jsxElement, style })
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
          })
        }

        return createStyledElement({ text: pureText, jsxElement })
      }

      return (
        <>
          {jsxElement}
          {text}
        </>
      )
    }, <></>)

    return finalTextElement
  }, [children, highlightedTextStyles, props])

  return <Text {...props}>{textFormated}</Text>
}

export default HighlightedText
