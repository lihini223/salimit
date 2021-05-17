import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        backgroundColor:'#D3D3D3',
        // height:hp(91),
        alignItems:'center',
        paddingTop:hp(3)
    },
    addBtn:{
        height:hp(5),
        width:wp(5),
        borderWidth:(2),
        backgroundColor:'red'

    },
    bottomContainer:{
        backgroundColor:'#D3D3D3',
        justifyContent:'center',
        alignItems:'center',
        height:hp(19)
    },
    addBtnStyles:{
        width: hp(8),
        height: hp(8),
    }
})