# React Native Highlighted Text
A React Native component to individually style texts inside a text

## Getting Started
Yarn
```sh
yarn add react-native-highlighted-text
```

npm
```sh
npm install react-native-highlighted-text
```

## Usage

### With normal styles
<img src="https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/assets/img/normal-styles-example.png?raw=true" width="200">

Place the text you want to style in square brackets as shown in the example below.\
```[[Write your text here]]```\
Place all the styles you want into an array in the component's highlightedTextStyles attribute.\
The bracketed text will be styled in the same order as the array styles.

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[
    {
      fontSize:  16,
      fontWeight:  'bold',
      fontStyle:  'italic',
    },
    {
      fontSize:  22,
      color:  'red',
      textTransform:  'uppercase',
    },
  ]}
>
  Open up [[App.tsx]] to start working on your [[app!]]
</HighlightedText>
```

### With named styles
<img src="https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/assets/img/named-styles-example.png?raw=true" width="200">

Place all the styles you want inside an object in the component's highlightedTextStyles attribute.\
In brackets, place the keys of the styling object you want, separated by a comma. Then add a = and then the text you want to style, as shown in the following example:\
```[[bold,red=Write your text here]]```

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={{
    bold: {
      fontWeight:  'bold',
    },
    red: {
      color:  'red',
    },
    lg: {
      fontSize:  22,
    },
  }}
>
  Lorem, ipsum [[bold=dolor]] sit amet consectetur adipisicing
  [[red=elit]]. Quaerat ducimus dicta cum [[lg=expedita]] consectetur quod
  tempore voluptatum autem aspernatur. [[bold,red,lg=Aliquid]].
</HighlightedText>
```

### With numbered styles
<img src="https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/assets/img/named-styles-example.png?raw=true" width="200">

Place all the styles you want inside an array in the component's highlightedTextStyles attribute.\
In brackets, place the position (starting at 1) of the styling object you want, separated by a comma. Then add a = and then the text you want to style, as shown in the following example:\
```[[1,3=Write your text here]]```

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[
    {
      fontWeight: 'bold',
    },
    {
      color: 'red',
    },
    {
      fontSize: 22,
    },
  ]}
>
  Lorem, ipsum [[1=dolor]] sit amet consectetur adipisicing [[2=elit]].
  Quaerat ducimus dicta cum [[3=expedita]] consectetur quod tempore
  voluptatum autem aspernatur. [[1,2,3=Aliquid]].
</HighlightedText>
```

## Functions

<img src="https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/assets/img/on-press-highlighted.gif?raw=true" width="200">

It's possible to add functions to highlighted texts in a prop called `onPressHighlighted`. They receive the clicked text as argument, it is useful to do things such as a link to redirect to a external site.  

But is only possible to add only one function for each single highlighted text, if a text get various styles like in named styles, it will be get only the first function that match with the key used.  

Functions in this props will follow the same `highlightedTextStyles`' structure. If the `highlightedTextStyles` is an array, the `onPressHighlighted` will be an array too, if the `highlightedTextStyles` is an object the `onPressHighlighted` will be an object, and so on.  

`onPressHighlighted` examples:  

### With normal styles

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[ ... ]}
  onPressHighlighted={[
    (text) => Alert.alert(text),
    (text) => console.log('Hello ' + text),
  ]}
>
  Open up [[App.tsx]] to start working on your [[app!]]
</HighlightedText>
```

### With named styles

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={{ ... }}
  onPressHighlighted={{
    red: (text) => Alert.alert(text),
    bold: (text) => console.log('Hello ' + text),
  }}
>
  Open up [[red=App.tsx]] to start working on your [[bold=app!]]
</HighlightedText>
```

### With numbered styles

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[ ... ]}
  onPressHighlighted={[
    (text) => Alert.alert(text),
    (text) => console.log('Hello ' + text),
  ]}
>
  Open up [[1=App.tsx]] to start working on your [[2=app!]]
</HighlightedText>
```

## Change the highlight character

By default, the character to highlight texts is the square brackets `[]`, having to put them around the text like as `[[highlighted text here]]`.  

It was chosen because the curly brackets `{}` are to execute javascript inside react elements, then the square brackets avoids this behavior.  

If you want to change the default character there are a prop with some options availables to do this. They are the `characters` prop and its values are `square-brackets` (`[]`), `curly-brackets` (`{}`), `tags` (`<>`) and `parenthesis` (`()`).  

### Examples

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[ ... ]}
  characters="parenthesis"
>
  Open up ((App.tsx)) to start working on your ((app!))
</HighlightedText>
```

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[ ... ]}
  characters="square-brackets"
>
  {`Open up {{App.tsx}} to start working on your {{app!}}`}
</HighlightedText>
```

```tsx
import { HighlightedText } from  'react-native-highlighted-text'

<HighlightedText
  style={styles.text}
  highlightedTextStyles={[ ... ]}
  characters="tags"
>
  {`Open up <<App.tsx>> to start working on your <<app!>>`}
</HighlightedText>
```

## Properties

| Prop | Description | Default | Required |
|---|---|---|---|
|**`highlightedTextStyles`**|Styles of the highlighted texts, [TextStyle](https://reactnative.dev/docs/text-style-props#props)'s array or [TextStyle](https://reactnative.dev/docs/text-style-props#props)'s object.|*None*|Yes|
|**`onPressHighlighted`**|Functions to run in the highlighted text, receives the text clicked as argument, `Array<(text: string) => void>` or `Record<string, (text: string) => void>`.|*None*|No|
|**`characters`**|Character used to highlight the words. `square-brackets` (`[]`), `curly-brackets` (`{}`), `tags` (`<>`) or `parenthesis` (`()`)|`square-brackets`|No|
|**`...Text Props`**|[React Native Text Props](https://reactnative.dev/docs/text#props)|*None*|No|

## Examples

You can see examples on the following links:
- [Normal Styles](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/normal-styles.tsx)
- [Named Styles](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/named-styles.tsx)
- [Numbered Styles](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/numbered-styles.tsx)
- [Normal Styles with Functions](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/normal-styles-with-functions.tsx)
- [Named Styles with Functions](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/named-styles-with-functions.tsx)
- [Numbered Styles with Functions](https://github.com/Bryant-Anjos/react-native-highlighted-text/blob/main/examples/numbered-styles-with-functions.tsx)
