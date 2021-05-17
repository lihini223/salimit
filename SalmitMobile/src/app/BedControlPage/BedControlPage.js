import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Image } from 'react-native';
import styles from './styles';
import MainHeader from '../../components/MainHeader/MainHeader'

class BedControlPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.topContainer}>
             <MainHeader/>
             
              <TouchableOpacity>
       <Image
        source={require('../../assets/images/back.png')}
        style={styles.backBtnStyles}
        />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
        <View style={styles.infoContainer}>

</View>
        </View>
        
      </View>
    
    );
  }
}

export default BedControlPage;
