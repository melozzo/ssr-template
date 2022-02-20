import React, { useEffect, useState, useRef} from 'react';
import {  View, Button, Dimensions, Modal, StyleSheet, Text} from 'react-native';


const ModalPrompt = ( props)=>{

const { visible, onClickYes, onDismiss, message}= props;
const { width, height } = Dimensions.get('window');
const modalStyles = StyleSheet.create({
      mainContainer: { flex: 1 },
      modalWrapper: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          height:height,
          width:width
      },
      modalContainer: {  
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'lightgray',
          borderStyle: 'solid',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1
      }
  });

      return (
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={visible}
            >
                 
                        <View style={modalStyles.modalWrapper}>
                              <View style={modalStyles.modalContainer}>
                                    <View style={{paddingTop:30, paddingBottm:30, paddingLeft:10, paddingRight:10}}>
                                          <Text style={{fontSize:20}}>{props.message}</Text>

                                    <Button title="Yes"
                                          onPress={onClickYes}/>
                                          <Button title="Dismiss"
                                          onPress={onDismiss}/>
                                    </View>
                              </View> 
                    </View>
                 
            </Modal> 
)

}
export default ModalPrompt;