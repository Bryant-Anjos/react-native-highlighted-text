import { NumberedStyles } from '../../src/formaters/numberedStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles, OnPressHighlighted } from '../../src/types'

describe('Test NumberedStyles.validate', () => {
  it('should validate the given key value number pair as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NumberedStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value text pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given texts and styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles({}, regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex, [])
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })
})

describe('Test NumberedStyles.create', () => {
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
    const formater = new NumberedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ipsum dolor sit [[2=amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles[1]]],
    })
    expect(onPress[0]()).toBe('amet 2')
  })

  it('should returns the correct values with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NumberedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem {{3=ipsum}} dolor sit {{2,1=amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles[2]], [styles[1], styles[0]]],
    })
    expect(onPress[0]()).toBe('ipsum 3')
    expect(onPress[1]()).toBe('amet 2')
  })

  it('should returns the correct values with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NumberedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ((2=ipsum)) dolor sit ((4,1=amet)), ((2,3,1=consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles[1]],
        [undefined, styles[0]],
        [styles[1], styles[2], styles[0]],
      ],
    })
    expect(onPress[0]()).toBe('ipsum 2')
    expect(onPress[1]()).toBe('amet 1')
    expect(onPress[2]()).toBe('consectetur 2')
  })

  it('should returns the correct values with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NumberedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      '<<2=Lorem>> <<3,1=ipsum>> dolor sit <<2=amet>>, <<1,3,2=consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(result).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles[1]],
        [styles[2], styles[0]],
        [styles[1]],
        [styles[0], styles[2], styles[1]],
      ],
    })
    expect(onPress[0]()).toBe('Lorem 2')
    expect(onPress[1]()).toBe('ipsum 3')
    expect(onPress[2]()).toBe('amet 2')
    expect(onPress[3]()).toBe('consectetur 1')
  })

  it('should not return a function with the given text', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles(styles, regex, functions)
    const { onPress, ...result } = formatText(
      'Lorem ipsum dolor sit [[5=amet]], consectetur adipiscing elit.',
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
