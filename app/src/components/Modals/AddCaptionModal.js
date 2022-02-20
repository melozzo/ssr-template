import React, { useState, useEffect } from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';
import { Input} from 'react-native-elements'
import SaveCancelButton from './../Buttons/SaveCancelButton';




const AddCaptionModal = (props) => {
      const { onSave, onCancel, existingCaption } = props;
      const { visible, onSubmit } = props;
      const { width, height } = Dimensions.get('window');
      const [caption, setCaption] = useState(existingCaption);

      useEffect(()=>{
            if( !existingCaption)
                  setCaption('')
            else
                  setCaption(existingCaption)
      }, [existingCaption])

      const modalStyles = StyleSheet.create({
            mainContainer: { flex: 1 },
            modalWrapper: {
                  paddingTop: 111,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  height: height,

            },
            modalContainer: {
                  width: width - 4,
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
                              <View style={{ width: '100%', paddingTop: 35, paddingLeft: 10, paddingRight:10 }}>
                                    <Input
                                          value={caption}
                                          label="Caption"
                                          onChangeText={setCaption}
                                          placeholder='Enter caption for this photo'
                                          style={{ fontSize: 14 }} 
                                    />
                              </View> 
                              <View style={{ marginTop:16, display:'flex' , flexDirection:'row', justifyContent:'center'}}>
                                    <SaveCancelButton 
                                          saveText={'Save Caption'}
                                          onSave={()=>{ handleSaveCaption(caption)} }
                                          onCancel={onCancel}
                                    />
                              </View>
                        </View>
                  </View>
            </Modal>
      )

      function handleSaveCaption(caption){
            onSave(caption)
            setCaption('')
      }

}
export default AddCaptionModal;