import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';

import ItemCard from '../../components/ItemCard/ItemCard'
import MainHeader from '../../components/MainHeader/MainHeader'
import styles from './styles';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <MainHeader/>
        <View style={styles.mainContainer}>
        <ItemCard
        itemNum="No 1"
        backgroundColor='red'
                />
                <ItemCard
        itemNum="No 2"
        backgroundColor='red'
                />
                <ItemCard
        itemNum="No 3"
        backgroundColor='red'
                />
                <ItemCard
        itemNum="No 4"
        backgroundColor='lightgreen'
                />
                <ItemCard
        itemNum="No 5"
        backgroundColor='lightgreen'
                />
                <ItemCard
        itemNum="No 6"
        backgroundColor='lightgrey'
                />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
      <Image
       source={require('../../assets/images/plus.png')}
       style={styles.addBtnStyles}
       />
       </TouchableOpacity>
      </View>
      </View>
      
    );
  }
}

export default HomePage;
