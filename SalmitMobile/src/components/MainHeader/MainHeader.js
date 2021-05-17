import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles'

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View  style={styles.headerStyles}>
        <Text style={styles.headerTxt}> Salmit </Text>
      </View>
    );
  }
}

export default MainHeader;
