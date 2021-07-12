import { NamedStyles } from '../../src/formaters/namedStyles'
import { generateRegex } from '../../src/generateRegex'
import { Character } from '../../src/enums'
import { formatText } from '../__mocks__/formatText'
import type { HighlightedTextStyles } from '../../src/types'

describe('Test NamedStyles.validate', () => {
  it('should validate the given key value text pair as true', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex)
    const validation = formater.validate('Lorem ipsum [[bold,red=dolor]] amet')
    expect(validation).toBe(true)
  })

  it('should validate the given texts as false', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NamedStyles({}, regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given key value number pair as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex)
    const validation = formater.validate('Lorem ipsum [[1,2=dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given texts and styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles({}, regex)
    const validation = formater.validate('Lorem ipsum [[dolor]] amet')
    expect(validation).toBe(false)
  })

  it('should validate the given styles as false', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles([], regex)
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

  it('should returns the correct styles with the given text with square-brackets', () => {
    const regex = generateRegex(Character.SQUARE_BRACKETS)
    const formater = new NamedStyles(styles, regex)
    const text = formatText(
      'Lorem ipsum dolor sit [[red=amet]], consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles.red]],
    })
  })

  it('should returns the correct styles with the given text with curly-brackets', () => {
    const regex = generateRegex(Character.CURLY_BRACKETS)
    const formater = new NamedStyles(styles, regex)
    const text = formatText(
      'Lorem {{big=ipsum}} dolor sit {{red,bold=amet}}, consectetur adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [[styles.big], [styles.red, styles.bold]],
    })
  })

  it('should returns the correct styles with the given text with parenthesis', () => {
    const regex = generateRegex(Character.PARENTHESIS)
    const formater = new NamedStyles(styles, regex)
    const text = formatText(
      'Lorem ((red=ipsum)) dolor sit ((green,bold=amet)), ((red,big,bold=consectetur)) adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles.red],
        [undefined, styles.bold],
        [styles.red, styles.big, styles.bold],
      ],
    })
  })

  it('should returns the correct styles with the given text with tags', () => {
    const regex = generateRegex(Character.TAGS)
    const formater = new NamedStyles(styles, regex)
    const text = formatText(
      '<<red=Lorem>> <<big,bold=ipsum>> dolor sit <<red=amet>>, <<bold,big,red=consectetur>> adipiscing elit.',
      regex,
      formater,
    )
    expect(text).toStrictEqual({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      styles: [
        [styles.red],
        [styles.big, styles.bold],
        [styles.red],
        [styles.bold, styles.big, styles.red],
      ],
    })
  })
})
