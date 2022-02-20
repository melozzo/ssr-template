import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Header, Card } from 'react-native-elements';
import Moment from 'moment';

import * as AlbumActions from './../../../shared/redux-store/actions/album-actions';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import { View, Image, Button, ScrollView, Text } from 'react-native';

// import LeftButton from '../components-junk/Buttons/LeftButton'
// import InfoButton from '../components-junk/Buttons/InfoButton'
//import ImageLoader from '../components-junk/ImageLoader'
import AddCaptionModal from './../components/Modals/AddCaptionModal'
import { Camera } from 'expo-camera'




const AlbumScreen = ({ route, navigation }) => {
	const s3Bucket = "https://traveloggia-guests.s3-us-west-2.amazonaws.com";
	const dispatch = useDispatch();
	const rawList = useSelector(state => state.album.photoList);
	const selectedSite = useSelector(state => state.site.selectedSite);
	const map = useSelector(state => state.map.selectedMap);
	let member = useSelector(state => state.auth.authenticatedMember);
	const readOnly = useSelector(state => state.auth.readOnly)

	const [hasPermission, setHasPermission] = useState(null);
	const [localURI, setLocalURI] = useState();
	const [dateTaken, setDateTaken] = useState();
	const [title, setTitle] = useState("Album");
	const [modalVisible, setModalVisible] = useState(false);
	const [editedPhoto, setEditedPhoto] = useState()
	const [photoList, setPhotoList] = useState([])


	useEffect(() => {
		if (readOnly)
			return;
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, [readOnly]);

	useEffect(() => {
		rawList.sort((photoA, photoB) => {
			if (Moment(photoA.DateAdded).isBefore(Moment(photoB.DateAdded))) {
				return 1
			} else if (Moment(photoA.DateAdded).isAfter(Moment(photoB.DateAdded))) {
				return -1
			} else {
				return 0
			}
		})
		setPhotoList(rawList)
	}, [rawList])

	useEffect(() => {
		if (!selectedSite) {
			setTitle(``);
			return
		} else {
			try {
				setTitle(`${selectedSite.Name}`);
				if (selectedSite.SiteID) {
					console.log('dispatching fetch photos from album screen')
					dispatch(AlbumActions.fetchPhotos(selectedSite.SiteID));
				}

			} catch (error) {
				console.log('in album use effect on selectedSite', error.message)
			}
		}
	}, [selectedSite, map])

	const keyExtractor = useCallback((item) => { item.PhotoID.toString(), [] })
	return (

		<View style={{ display: 'flex', flexDirection: 'column', marginBottom: 100 }}>
			<Header
				// leftComponent={<LeftButton handleClick={toggleDrawer} />}
				placement="center"
				centerComponent={<Text style={{ color: '#707c87', textAlign: 'center', maxWidth: 200 }} >{title}</Text>}
			//	rightComponent={<InfoButton handleClick={handleInfoButton} />}
			/>

			{!selectedSite &&
				<View>
					<Card style={{ padding: 10 }}>
						<Text style={{ fontSize: 20, color: '#a7427c', fontStyle: 'italic' }}>
							{`Select a site from the left burger menu or by clicking on a map location, to view photo album`}
						</Text>
					</Card>
				</View>
			}

			{selectedSite &&
				<ScrollView style={{ width: '100%', paddingRight: 8, paddingLeft: 8, marginBottom: 20, marginTop: 10 }}>
					{
						!readOnly && <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
							<Button title="Pick an image from camera roll" onPress={pickImage} />
							{localURI && <Image source={{ uri: localURI }} style={{ width: 100, height: 100 }} />}
							<Button title="Upload to Traveloggia storage" disabled={!localURI} onPress={savePhoto} />
						</View>
					}
					{
						photoList.map(photo => {
							return (
								<View key={Math.random()} style={{ marginBottom: 24 }}>
									<ImageLoader
										MemberID={member ? member.MemberID : null}
										MapID={selectedSite.MapID}
										photo={photo}
										onEdit={toggleModal}
									/>

								</View>
							)
						})
					}
					<AddCaptionModal
						existingCaption={editedPhoto ? editedPhoto.Caption : null}
						visible={modalVisible}
						onCancel={e => { setModalVisible(false) }}
						onSave={handleSaveCaption}
					/>
				</ScrollView>
			}
		</View >
	)

	function toggleModal(selectedPhoto) {
		setEditedPhoto(selectedPhoto)
		const toggled = !modalVisible; setModalVisible(toggled)
	}

	function toggleDrawer() {
		navigation.toggleDrawer();
	}

	function handleInfoButton() {
		navigation.navigate("Info", { screen: "Site" })
	}

	async function getPermissionAsync() {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	async function pickImage() {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
				exif: true
			});
			if (!result.cancelled) {
				if (result.exif && result.exif.DateTimeOriginal) {
					console.log('exif', result.exif)
					console.log('original photo date', result.exif.DateTimeOriginal)
					const normalizedDate = normalizeDate(result.exif.DateTimeOriginal)
					setDateTaken(normalizedDate);
				}
				setLocalURI(result.uri);
			}
		} catch (E) {
			console.log(E);
		}
	};

	function createPhotoRecord(objKey) {
		const dateString = Moment().format("MM-DD-YY-hh-m-a");
		const fileName = `tra-${dateString}.jpg`;
		console.log(fileName)
		let photo = {};
		photo.DateTaken = dateTaken ? dateTaken : null;
		photo.SiteID = selectedSite.SiteID;
		photo.FileName = fileName;
		photo.DeviceStorageURL = localURI;
		photo.StorageURL = `${s3Bucket}/${objKey}`
		photo.IsDeleted = false;
		photo.Caption = "";
		return photo;
	}

	function normalizeDate(dateTaken) {
		console.log('date horror', dateTaken);
		const separator = dateTaken.indexOf(' ');
		const day = dateTaken.substring(0, separator);
		const reformattedDay = day.replace(/:/g, "/");
		const time = dateTaken.substring(separator + 1, dateTaken.length)
		const reform = `${reformattedDay} ${time}`;
		const mel = new Date(reform)
		console.log("date takent", mel.toLocaleString())
		return mel;
	}

	function savePhoto() {
		if (!selectedSite) {// to do when you create a new site, it should be selected
			alert('You must select a site from the drawer menu list first, then return to the album page');
			return;
		}
		var objKey = `${member.MemberID}/${map.MapID}/${selectedSite.SiteID}/`;
		const photoRecord = savePhotoRecord(objKey)

		saveToS3(objKey, photoRecord);
		setLocalURI(null);
	}

	function savePhotoRecord(objKey) {
		const photoRecord = createPhotoRecord(objKey);
		dispatch(AlbumActions.createPhoto(photoRecord))
		return photoRecord;
	}

	function saveToS3(objKey, photoRecord) {
		dispatch(AlbumActions.uploadPhoto(objKey, photoRecord));
	}

	function handleSaveCaption(caption) {
		dispatch(AlbumActions.updatePhoto(caption, editedPhoto));
		setModalVisible(false);
		setEditedPhoto({})
	}

}

export default AlbumScreen;