import { NormalStyles } from '../../src/formaters/normalStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles, OnPressHighlighted } from '../../src/types'

describe('Test NormalStyles.validate', () => {
  it('should validate the given texts and styles as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NormalStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value number pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value text pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles({}, regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })
})

describe('Test NormalStyles.create', () => {
  const styles: HighlightedTextStyles = [
    {
      fontWeight: 'bold',
    },
    {
      color: 'red',
    },
    {
      fontSize: 20,
    },
  ]

  const functions: OnPressHighlighted = [
    text => `${text} 1`,
    text => `${text} 2`,
    text => `${text} 3`,
  ]

  it('should returns the correct values with the given text with square-brackets', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ipsum dolor sit [[amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [styles[0]],
    })
    expect(onPress[0]()).toBe('amet 1')
  })

  it('should returns the correct values with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NormalStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem {{ipsum}} dolor sit {{amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [styles[0], styles[1]],
    })
    expect(onPress[0]()).toBe('ipsum 1')
    expect(onPress[1]()).toBe('amet 2')
  })

  it('should returns the correct values with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NormalStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ((ipsum)) dolor sit ((amet)), ((consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: styles,
    })
    expect(onPress[0]()).toBe('ipsum 1')
    expect(onPress[1]()).toBe('amet 2')
    expect(onPress[2]()).toBe('consectetur 3')
  })

  it('should returns the correct values with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NormalStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      '<<Lorem>> <<ipsum>> dolor sit <<amet>>, <<consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [...styles, undefined],
    })
    expect(onPress[0]()).toBe('Lorem 1')
    expect(onPress[1]()).toBe('ipsum 2')
    expect(onPress[2]()).toBe('amet 3')
    expect(onPress[3]()).toBe(undefined)
  })
})
