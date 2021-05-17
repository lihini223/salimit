import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../screen/Home';
import AddBed from '../screen/AddBed';
import BedControl from '../screen/BedControl'

const Stack = createStackNavigator();

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
        >   
         <Stack.Screen name="BedControl" component={BedControl} />
           <Stack.Screen name="AddBed" component={AddBed} />
            <Stack.Screen name="Home" component={Home} />
            

        </Stack.Navigator>
    </NavigationContainer>
    );
 }
}

export default MainNavigation;
