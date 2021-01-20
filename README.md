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
  [[red=elit]]. Quaerat ducimus dicta cum [lg=expedita]] consectetur quod
  tempore voluptatum autem aspernatur. [[bold,red,lg=Aliquid]].
</HighlightedText>
```
