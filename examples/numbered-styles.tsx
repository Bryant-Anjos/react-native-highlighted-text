// @ts-nocheck
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HighlightedText } from 'react-native-highlighted-text'

export const NumberedStylesExample: React.FC = () => {
  return (
    <View style={styles.container}>
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
