import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
    headerStyles: {
        height: hp(9),
        backgroundColor: '#1DA1F2'

    },
    headerTxt: {
        justifyContent: 'center',
        color: "white",
        fontSize: hp(6)


    }
})