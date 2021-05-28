import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions,Image,View} from 'react-native';
import {Colors} from '../common/colors';

export const ListHeaderComponent = ({pressHandler}) =>{
  return(
    <View style={styles.listHeadCont}>
      {/* <Text style={{flex:1}}>Sort By Date</Text> */}
      <TouchableOpacity 
       activeOpacity={0.7}
       onPress={pressHandler}
       >
        <Image source={{uri:'https://static.thenounproject.com/png/133028-200.png'}} 
          style={styles.image}
          
        />
      </TouchableOpacity>  
    </View>  
  )
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  listHeadCont:{
    flexDirection:'row',
    padding:4,
    height:height*0.09,
    borderRadius:10,
    backgroundColor:Colors.frozen,
    alignItems:'center',
    justifyContent:'flex-end'
  },
  image:{
    width:30,
    height:30,
    resizeMode:'contain',
    tintColor:Colors.darkGrey
  }
});
