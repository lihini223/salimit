import React, { Component } from 'react';
import { View, Text,TextInput } from 'react-native';

import styles from './styles'

class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {placeholder} = this.props
    return (
      <View style={styles.mainContainer}>
       <TextInput
              style={styles.textBoxStyle}
              placeholder={placeholder}
              />
              
      </View>
    );
  }
}

export default TextInputBox;
