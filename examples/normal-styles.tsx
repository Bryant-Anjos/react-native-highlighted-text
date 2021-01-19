// @ts-nocheck
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HighlightedText } from 'react-native-highlighted-text'

export const NormalStylesExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <HighlightedText
        style={styles.text}
        highlightedTextStyles={[
          {
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
          {
            fontSize: 22,
            color: 'red',
            textTransform: 'uppercase',
            marginTop: 50,
          },
        ]}
      >
        Open up [[App.tsx]] to start working on your [[app!]]
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
