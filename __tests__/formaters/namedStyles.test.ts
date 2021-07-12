import { NamedStyles } from '../../src/formaters/namedStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles, OnPressHighlighted } from '../../src/types'

describe('Test NamedStyles.validate', () => {
  it('should validate the given key value text pair as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex, {})
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NamedStyles({}, regex, {})
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value number pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex, {})
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given texts and styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex, {})
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles([], regex, {})
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })
})

describe('Test NamedStyles.create', () => {
  const styles: HighlightedTextStyles = {
    bold: {
      fontWeight: 'bold',
    },
    red: {
      color: 'red',
    },
    big: {
      fontSize: 20,
    },
  }

  const functions: OnPressHighlighted = {
    bold: text => `${text} 1`,
    red: text => `${text} 2`,
    big: text => `${text} 3`,
  }

  it('should returns the correct values with the given text with square-brackets', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ipsum dolor sit [[red=amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles.red]],
    })
    expect(onPress[0]()).toBe('amet 2')
  })

  it('should returns the correct values with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NamedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem {{big=ipsum}} dolor sit {{red,bold=amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles.big], [styles.red, styles.bold]],
    })
    expect(onPress[0]()).toBe('ipsum 3')
    expect(onPress[1]()).toBe('amet 2')
  })

  it('should returns the correct values with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NamedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ((red=ipsum)) dolor sit ((green,bold=amet)), ((red,big,bold=consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles.red],
        [undefined, styles.bold],
        [styles.red, styles.big, styles.bold],
      ],
    })
    expect(onPress[0]()).toBe('ipsum 2')
    expect(onPress[1]()).toBe('amet 1')
    expect(onPress[2]()).toBe('consectetur 2')
  })

  it('should returns the correct values with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NamedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      '<<red=Lorem>> <<big,bold=ipsum>> dolor sit <<red=amet>>, <<bold,big,red=consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles.red],
        [styles.big, styles.bold],
        [styles.red],
        [styles.bold, styles.big, styles.red],
      ],
    })
    expect(onPress[0]()).toBe('Lorem 2')
    expect(onPress[1]()).toBe('ipsum 3')
    expect(onPress[2]()).toBe('amet 2')
    expect(onPress[3]()).toBe('consectetur 1')
  })

  it('should not return a function with the given text', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ipsum dolor sit [[green=amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[undefined]],
    })
    expect(onPress[0]()).toBe(undefined)
  })
})
