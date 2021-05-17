import React, { Component } from 'react';
import { View, Text ,Image, Touchable, TouchableOpacity} from 'react-native';
import styles from './styles';
import MainHeader from '../../components/MainHeader/MainHeader'
import TextInputBox from '../../components/TextInputBox'

class AddBedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.topContainer}>
           <MainHeader/>
          <View style={styles.topContainer}>
              <Text style={styles.legendTxt}>Add a bed</Text>
              <TouchableOpacity>
       <Image
        source={require('../../assets/images/back.png')}
        style={styles.backBtnStyles}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
      <TextInputBox
      placeholder="Add bed"/>
      <TextInputBox
      placeholder="Saline status"/>
      <TextInputBox
      placeholder="Name"/>
      <TextInputBox
      placeholder="Patient ID"/>
      <TextInputBox
      placeholder="Volume"/>
      <TextInputBox
      placeholder="time"/>
      </View>
        
      </View>
    );
  }
}

export default AddBedPage;
