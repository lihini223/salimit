import React, { Component } from 'react';
import HomePage from '../app/HomePage';

class Home extends Component {


    render() {
        const { navigation } = this.props;
        return (
            <HomePage navigation={navigation} />
        );
    }
}

export default Home;
