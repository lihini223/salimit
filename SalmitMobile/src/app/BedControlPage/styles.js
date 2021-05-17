import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    backBtnStyles:{
        width: hp(8),
        height: hp(8),
    },
    topContainer:{
        backgroundColor:'#D3D3D3',
        flex:1
    
    },
    middleContainer:{
         height:hp(75),
         width:wp(80),
        backgroundColor:'white',
         borderRadius:hp(3),
         marginHorizontal:wp(10)  
    },
    infoContainer:{
        height:hp(20),
         width:wp(50),
         borderWidth:2,
         borderRadius:hp(3),
         marginLeft:wp(15),
         marginTop:hp(50)
    }
})