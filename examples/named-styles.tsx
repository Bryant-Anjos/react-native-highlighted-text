// @ts-nocheck
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HighlightedText } from 'react-native-highlighted-text'

export const NamedStylesExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <HighlightedText
        style={styles.text}
        highlightedTextStyles={{
          bold: {
            fontWeight: 'bold',
          },
          red: {
            color: 'red',
          },
          lg: {
            fontSize: 22,
          },
        }}
      >
        Lorem, ipsum [[bold=dolor]] sit amet consectetur adipisicing
        [[red=elit]]. Quaerat ducimus dicta cum [[lg=expedita]] consectetur quod
        tempore voluptatum autem aspernatur. [[bold,red,lg=Aliquid]].
      </HighlightedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
  },
})
