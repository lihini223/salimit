import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles'

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  render() {
    const{itemNum}=this.props
    return (
      <TouchableOpacity style={styles.mainContainer}>
        <Text style={styles.itemTxt}> {itemNum} </Text>
        <View style={{...styles.blob,backgroundColor:this.props.backgroundColor}}></View>
      </TouchableOpacity>
    );
  }
}

export default ItemCard;
