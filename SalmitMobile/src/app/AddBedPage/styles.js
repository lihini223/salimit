import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    backBtnStyles:{
        width: hp(8),
        height: hp(8),
    },
    middleContainer:{
        marginHorizontal:wp(10)
    },
    legendTxt:{
        fontSize:hp(4),
        textAlign:'center'
    },
})