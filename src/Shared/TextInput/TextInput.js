import React, { useCallback, useState } from 'react'
import {
  TextInput as RNTextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

const TextInput = ({ onChange, editable, ...props }) => {
  const [value, setValue] = useState(null)
  const onValueChange = useCallback(value => {
    setValue(value)
    onChange(value)
  }, [])
  return (
    <SafeAreaView>
      <RNTextInput
        style={styles.input}
        onChangeText={onValueChange}
        value={value}
        placeholder="hello"
        keyboardType="default"
        editable={editable}
        {...props}
      />
    </SafeAreaView>
  )
}

TextInput.defaultProps = {
  onChange: () => {},
  editable: true,
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
})

export default TextInput
