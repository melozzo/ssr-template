import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';
import { Input, } from 'react-native-elements'
//import { AntDesign } from '@expo/vector-icons';
import SaveCancelButton from './../Buttons/SaveCancelButton'



const AddLinkModal = (props) => {
      const { onSave, onCancel, onDelete, existingValue, visible} = props;
     // console.log('existing value', existingValue)
      const { width, height } = Dimensions.get('window');
      const [title, setTitle] = useState();
      const [url, setUrl] = useState()
   
      useEffect(() => {
            if (!existingValue)
                  return;
           
            setTitle(existingValue.Title);
            setUrl(existingValue.URL);
      }, [existingValue])

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

                              <View style={{ width: '100%', paddingTop: 10, paddingBottm: 50, paddingLeft: 10, paddingRight: 10 }}>
                              {/* {existingValue && 
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                          <Button
                                                buttonStyle={{ float: "right" }}
                                                type="clear"
                                                titleStyle={{fontSize:10}}
                                                title="Delete"
                                                iconRight
                                                icon={<AntDesign name="delete" size={24} color="gray"
                                                      onPress={e => { onDelete() }} />}
                                          ></Button>
                                    </View> 
                              } */}
                                    <Input
                                          value={title}
                                          label="Title"
                                          onChangeText={setTitle}
                                          placeholder='Enter title for this link' />
                                    <Input
                                        
                                          label="URL"
                                          value={url}
                                          onChangeText={handleURL}
                                          placeholder='Paste or enter the url' />

                                    <View style={{ marginTop:10, display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:20 }}>
                                          <SaveCancelButton
                                                onCancel={onCancel}
                                                onSave= {handleSave}
                                          />
                                   </View>
                                    
                              </View>
                        </View>
                  </View>
            </Modal>
      )

      function handleURL(strValue){
            setUrl(strValue.toLowerCase())
      }

      function handleSave() {
            onSave(title, url);
            setTitle('');
            setUrl('');
      }

}
export default AddLinkModal;