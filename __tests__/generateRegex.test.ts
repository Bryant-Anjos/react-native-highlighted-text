import { Character } from '../src/enums'
import { generateRegex } from '../src/generateRegex'
import { Characters } from '../src/types'

describe('generateRegex', () => {
  const expectedValues = [
    {
      KEY_VALUE_NUMBER: /^[^0,]([,\d]+)?=.+/,
      KEY_VALUE_TEXT: /^[A-Za-z]([,\w]+)?=.+/,
      TEXT_AMONG_BRACKETS: /\[\[(.*)\]\]/,
      TEXT_WITH_BRACKETS: /(\[\[.+?\]\])/,
    },
    {
      KEY_VALUE_NUMBER: /^[^0,]([,\d]+)?=.+/,
      KEY_VALUE_TEXT: /^[A-Za-z]([,\w]+)?=.+/,
      TEXT_AMONG_BRACKETS: /\{\{(.*)\}\}/,
      TEXT_WITH_BRACKETS: /(\{\{.+?\}\})/,
    },
    {
      KEY_VALUE_NUMBER: /^[^0,]([,\d]+)?=.+/,
      KEY_VALUE_TEXT: /^[A-Za-z]([,\w]+)?=.+/,
      // eslint-disable-next-line no-useless-escape
      TEXT_AMONG_BRACKETS: /\<\<(.*)\>\>/,
      // eslint-disable-next-line no-useless-escape
      TEXT_WITH_BRACKETS: /(\<\<.+?\>\>)/,
    },
    {
      KEY_VALUE_NUMBER: /^[^0,]([,\d]+)?=.+/,
      KEY_VALUE_TEXT: /^[A-Za-z]([,\w]+)?=.+/,
      TEXT_AMONG_BRACKETS: /\(\((.*)\)\)/,
      TEXT_WITH_BRACKETS: /(\(\(.+?\)\))/,
    },
  ]

  let index = 0
  Object.values(Character).forEach(character => {
    it(`should return the corrects regex given the ${character} character`, () => {
      const regex = generateRegex(character)

      expect(regex).toStrictEqual(expectedValues[index])
      index++
    })
  })
})

describe('Test regex of generateRegex', () => {
  const testRegex = (text: string, character: Characters) => {
    const regex = generateRegex(character)
    const {
      KEY_VALUE_NUMBER,
      KEY_VALUE_TEXT,
      TEXT_AMONG_BRACKETS,
      TEXT_WITH_BRACKETS,
    } = regex

    const textSplited = text.split(TEXT_WITH_BRACKETS)
    const textTested = TEXT_WITH_BRACKETS.test(text)
    const textReplaced = textTested
      ? text.replace(TEXT_AMONG_BRACKETS, '$1')
      : null
    const keyValueNumber = KEY_VALUE_NUMBER.test(text)
    const keyValueText = KEY_VALUE_TEXT.test(text)

    return {
      textSplited,
      textTested,
      textReplaced,
      keyValueNumber,
      keyValueText,
    }
  }

  it('should detect the text a key value number', () => {
    const tests = testRegex('2,5,8=Hello world!', 'square-brackets')
    expect(tests).toStrictEqual({
      textSplited: ['2,5,8=Hello world!'],
      textTested: false,
      textReplaced: null,
      keyValueNumber: true,
      keyValueText: false,
    })
  })

  it('should detect the text a key value text', () => {
    const tests = testRegex('italic,green=Hello world!', 'square-brackets')
    expect(tests).toStrictEqual({
      textSplited: ['italic,green=Hello world!'],
      textTested: false,
      textReplaced: null,
      keyValueNumber: false,
      keyValueText: true,
    })
  })

  it('should split correctly the texts with curly-brackets', () => {
    const tests = testRegex('Hello {{world}}!', 'curly-brackets')
    expect(tests).toStrictEqual({
      textSplited: ['Hello ', '{{world}}', '!'],
      textTested: true,
      textReplaced: 'Hello world!',
      keyValueNumber: false,
      keyValueText: false,
    })
  })

  it('should split correctly the texts with square-brackets', () => {
    const tests = testRegex('2,5,8=[[Hello]] world!', 'square-brackets')
    expect(tests).toStrictEqual({
      textSplited: ['2,5,8=', '[[Hello]]', ' world!'],
      textTested: true,
      textReplaced: '2,5,8=Hello world!',
      keyValueNumber: true,
      keyValueText: false,
    })
  })

  it('should split correctly the texts with tags', () => {
    const tests = testRegex('bold,red=<<Hello>> world!', 'tags')
    expect(tests).toStrictEqual({
      textSplited: ['bold,red=', '<<Hello>>', ' world!'],
      textTested: true,
      textReplaced: 'bold,red=Hello world!',
      keyValueNumber: false,
      keyValueText: true,
    })
  })

  it('should split correctly the texts with parenthesis', () => {
    const tests = testRegex(
      'Lorem ((ipsum)) dolor sit {{amet}}, consectetur [[adipiscing]] elit. In a <<urna>> dolor.',
      'parenthesis',
    )
    expect(tests).toStrictEqual({
      textSplited: [
        'Lorem ',
        '((ipsum))',
        ' dolor sit {{amet}}, consectetur [[adipiscing]] elit. In a <<urna>> dolor.',
      ],
      textTested: true,
      textReplaced:
        'Lorem ipsum dolor sit {{amet}}, consectetur [[adipiscing]] elit. In a <<urna>> dolor.',
      keyValueNumber: false,
      keyValueText: false,
    })
  })

  it('should not split the texts', () => {
    const tests = testRegex(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a urna dolor.',
      'square-brackets',
    )
    expect(tests).toStrictEqual({
      textSplited: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a urna dolor.',
      ],
      textTested: false,
      textReplaced: null,
      keyValueNumber: false,
      keyValueText: false,
    })
  })
})
