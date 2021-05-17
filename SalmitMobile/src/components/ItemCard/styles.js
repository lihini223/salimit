import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        marginVertical:hp(1),
        borderRadius:15,
        height:hp(9),
        width:wp(70),
        backgroundColor:'white',
        flexDirection:'row',
        paddingHorizontal:wp(4),
        justifyContent:'space-between',
        alignItems:'center'
  
    },
    itemTxt:{
        fontSize:hp(3)
    },
    blob:{
     
        borderRadius:hp(45),
        height:hp(5),
        width:hp(5),
       
    }
})