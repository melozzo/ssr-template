import React, {  useState, useRef, useEffect} from 'react';
import { View, Button, Dimensions, Modal, StyleSheet} from 'react-native';
import { Input} from 'react-native-elements'

const SearchModal = (props) => {

      const { visible, onSubmit} = props;
      const { width, height } = Dimensions.get('window');
      const [searchTerm, setSearchTerm] = useState('');
      const searchInput = useRef(null);

      const modalStyles = StyleSheet.create({
            mainContainer: { flex: 1 },
            modalWrapper: {
                  paddingTop:111,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  height: height,
                  
            },
            modalContainer: {
                  width: width - 4 ,
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

      useEffect( ()=>{
            if( ! searchInput.current)
            return;
            searchInput.current.focus()
      },[searchInput])

      return (
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={visible}
            >

                  <View style={modalStyles.modalWrapper}>
                        <View style={modalStyles.modalContainer}>
                              <View style={{ width:'100%', paddingTop: 30, paddingBottm: 30, paddingLeft: 10, paddingRight: 10 }}>
                                    <Input 
                                          ref={searchInput}
                                          label="Search"
                                          onChangeText = {setSearchTerm }
                                          placeholder='Enter an address or placename'/>

                                    <Button title="Locate"
                                          onPress={handleLocate} />

                              </View>
                        </View>
                  </View>
            </Modal>
      )

    
      function handleLocate(){
            onSubmit(searchTerm)
            setSearchTerm('');
            
      }

}
export default SearchModal;