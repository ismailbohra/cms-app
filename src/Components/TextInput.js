import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 10,
    borderColor: '#d7d7d7',
    padding: 10,
    fontSize: 17,
  },
})
const InputField = props => {
  return (
    <TextInput placeholder={props.label} style={styles.textInput} {...props} />
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
}

export default InputField
