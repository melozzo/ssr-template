import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import SaveCancelButton from '../Buttons/SaveCancelButton'
import * as MapActions from '.././../../../shared/redux-store/actions/map-actions'
import lodash from 'lodash'


const AddEditMapModal = (props) => {

	const { visible, onCancel, navigation, isEdit} = props;
	const { width, height } = Dimensions.get('window');
	const [mapName, setMapName] = useState('');
	const dispatch = useDispatch();
	const authenticatedMember = useSelector(state => state.auth.authenticatedMember);
	const selectedMap = useSelector(state => state.map.selectedMap)


	const modalStyles = StyleSheet.create({
		mainContainer: { flex: 1 },
		modalWrapper: {
			paddingTop: 108,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: 'transparent',


		},
		modalContainer: {
			width: width - 6,
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

	useEffect(() => {
		if ( !isEdit || !selectedMap){
			setMapName('')
			return;
		}
	
		setMapName(selectedMap.MapName)
	}, [isEdit , selectedMap])



	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
		>

			<View style={modalStyles.modalWrapper}>
				<View style={modalStyles.modalContainer}>

					<View style={{ width: '100%', paddingTop: 30, paddingBottm: 10, paddingLeft: 10, paddingRight: 10 }}>
						
						<Input
							value={mapName}
							label="Map Name"
							onChangeText={setMapName}
							placeholder='Enter map name' />

						<View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:10}}>
							<SaveCancelButton
								saveText={'Save Map'}
								onCancel={handleCancel}
								onSave={handleSave} />
						</View>

					</View>
				</View>
			</View>
		</Modal>
	)


	function handleSave() {
		
		if (!selectedMap) {
			dispatch(MapActions.createMap(authenticatedMember.MemberID, mapName))
			navigation.navigate("Map")
		} else {
			const mapCopy = lodash.cloneDeep(selectedMap);
			mapCopy.MapName= mapName
			dispatch(MapActions.updateMap(mapCopy))
		}
		setMapName('')
		onCancel();
	}

	function handleCancel(){
		const originalName = selectedMap ? selectedMap.MapName:''
		setMapName(originalName);
		onCancel();
	}

}
export default AddEditMapModal;