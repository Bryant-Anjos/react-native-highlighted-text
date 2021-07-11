import { NormalStyles } from '../../src/formaters/normalStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles } from '../../src/types'

describe('Test NormalStyles.validate', () => {
  it('should validate the given texts and styles as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NormalStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value number pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value text pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles([], regex)
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles({}, regex)
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

  it('should returns the correct styles with the given text with square-brackets', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NormalStyles(styles, regex)
    const text = formatText(
      'Lorem ipsum dolor sit [[amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [styles[0]],
    })
  })

  it('should returns the correct styles with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NormalStyles(styles, regex)
    const text = formatText(
      'Lorem {{ipsum}} dolor sit {{amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [styles[0], styles[1]],
    })
  })

  it('should returns the correct styles with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NormalStyles(styles, regex)
    const text = formatText(
      'Lorem ((ipsum)) dolor sit ((amet)), ((consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: styles,
    })
  })

  it('should returns the correct styles with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NormalStyles(styles, regex)
    const text = formatText(
      '<<Lorem>> <<ipsum>> dolor sit <<amet>>, <<consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [...styles, undefined],
    })
  })
})
