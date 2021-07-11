import { NumberedStyles } from '../../src/formaters/numberedStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles } from '../../src/types'

describe('Test NumberedStyles.validate', () => {
  it('should validate the given key value number pair as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NumberedStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value text pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given texts and styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles({}, regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles([], regex)
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

  it('should returns the correct styles with the given text with square-brackets', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NumberedStyles(styles, regex)
    const text = formatText(
      'Lorem ipsum dolor sit [[2=amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles[1]]],
    })
  })

  it('should returns the correct styles with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NumberedStyles(styles, regex)
    const text = formatText(
      'Lorem {{3=ipsum}} dolor sit {{2,1=amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles[2]], [styles[1], styles[0]]],
    })
  })

  it('should returns the correct styles with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NumberedStyles(styles, regex)
    const text = formatText(
      'Lorem ((2=ipsum)) dolor sit ((4,1=amet)), ((2,3,1=consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles[1]],
        [undefined, styles[0]],
        [styles[1], styles[2], styles[0]],
      ],
    })
  })

  it('should returns the correct styles with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NumberedStyles(styles, regex)
    const text = formatText(
      '<<2=Lorem>> <<3,1=ipsum>> dolor sit <<2=amet>>, <<1,3,2=consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles[1]],
        [styles[2], styles[0]],
        [styles[1]],
        [styles[0], styles[2], styles[1]],
      ],
    })
  })
})
