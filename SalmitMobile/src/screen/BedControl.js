import React, { Component } from 'react';
import BedControlPage from '../app/BedControlPage';

class BedControl extends Component {


    render() {
        const { navigation } = this.props;
        return (
            <BedControlPage navigation={navigation} />
        );
    }
}

export default BedControl;
