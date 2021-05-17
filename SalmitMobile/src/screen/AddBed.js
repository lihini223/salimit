import React, { Component } from 'react';
import AddBedPage from '../app/AddBedPage';

class AddBed extends Component {


    render() {
        const { navigation } = this.props;
        return (
            <AddBedPage navigation={navigation} />
        );
    }
}

export default AddBed;
