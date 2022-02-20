import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Card, ListItem, Header, Button } from 'react-native-elements'
import * as SiteActions from './../../../shared/redux-store/actions/site-actions';
import * as WebBrowser from 'expo-web-browser';
const _ = require('lodash');

//import AlbumButton from '../components/Buttons/AlbumButton'
//import LeftButton from '../components/Buttons/LeftButton';
//import EditDeleteButton from '../components/Buttons/EditDeleteButton'
//import Ikon from 'react-native-vector-icons/Entypo'
import AddLinkModal from './../components/Modals/AddLinkModal'


const Links = ({ route, navigation }) => {
	const selectedSite = useSelector(state => state.site.selectedSite);
	const [siteDisplayName, setSiteDisplayName] = useState("");
	const dispatch = useDispatch();
	const readOnly = useSelector(state => state.auth.readOnly);

	const [links, setLinks] = useState([])
	const [addEditVisible, setAddEditVisible] = useState(false);
	const [selectedLink, setSelectedLink] = useState()
	const [isUpdate, setIsUpdate] = useState(false)

	useEffect(() => {
		if (!selectedSite) {
			setSiteDisplayName("")
		} else {
			setSiteDisplayName(`${selectedSite.Name}`)
			console.log('link count', selectedSite.Links.length)

			if (selectedSite.Links)
				setLinks(selectedSite.Links)
			else
				setLinks([])
		}
	}, [selectedSite]);

	return (
		<View>
			<Header
				//leftComponent={<LeftButton handleClick={toggleDrawer} />}
				placement="center"
				centerComponent={ <Text style ={{color: '#707c87', textAlign:'center', maxWidth:200}} >{siteDisplayName}</Text>}
				//rightComponent={<AlbumButton handleClick={handleAlbumButton} />}
			/>
				{!selectedSite &&
					<View>
							<Card style={{padding:10}}>
								<Text style={{fontSize:20, color:'#a7427c',  fontStyle:'italic'}}>
										{`Select a site from the left burger menu or by clicking on a map location, to add / view links`}
								</Text>
							</Card>
					</View>
            }
			{ selectedSite && <React.Fragment>

			<AddLinkModal
				visible={addEditVisible}
				existingValue={selectedLink}
				onSave={handleSave}
				onCancel={handleCancel}
				onDelete={handleDelete}
			/>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<Button
					containerStyle={{ width: 240, marginTop: 16 }}
					type="outline"
					raised={true}
					//icon={<Ikon name="add-to-list" size={36} style={{ paddingRight: 10 }} />}
					iconLeft
					title="Add Link   "
					onPress={e => { const toggled = !addEditVisible; setAddEditVisible(toggled); }} />

			</View>
		

			<ScrollView>
				{
					links.map(link => {
						return (
							<Card key={link._id} >
								<ListItem >
									<ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={{ textDecorationLine: 'underline', fontSize: 18, textDecorationColor: '#a7427c', color: '#a7427c' }} onPress={e => { handleLink(link.URL) }}>
											{link.Title}
										</Text>
										<EditDeleteButton
											large={false}
											item={link}
											onDelete={handleDelete}
											onEdit={handleEdit} />
									</ListItem.Content>
								</ListItem>
							</Card>
						)
					})
				}
			</ScrollView>
			</React.Fragment>
		}
		</View>
	)


	function toggleDrawer() {
		navigation.toggleDrawer();
	}

	function handleAlbumButton() {
		navigation.navigate("Album")
	}

	function handleLink(url) {
		WebBrowser.openBrowserAsync(url)
	}

	function handleEdit(link) {
		setSelectedLink(link)
		setIsUpdate(true)
		setAddEditVisible(true)
	}

	function handleDelete(link) {
		const linkIndex = selectedSite.Links.indexOf(link)
		const copyOfLinks = selectedSite.Links ? selectedSite.Links.slice() : [];
		copyOfLinks.splice(linkIndex, 1);
		const copyOfSite = Object.assign({}, selectedSite);
		copyOfSite.Links= copyOfLinks;
		dispatch(SiteActions.updateSite(copyOfSite));
		
		setSelectedLink();
		setAddEditVisible(false);
	}

	function handleSave(title, url) {
		const copyOfSite = Object.assign({}, selectedSite);
		console.log('copied site is ', copyOfSite)
		const copyOfLinks = selectedSite.Links ? selectedSite.Links.slice() : [];
		if (!isUpdate) {
			const newLink = {
				"SiteID": selectedSite.SiteID,
				"Title": title,
				"URL": url
			}
			copyOfLinks.push(newLink);
		} else if (isUpdate) {
			const linkIndex = selectedSite.Links.indexOf(selectedLink)
			const updateLink = Object.assign({}, selectedSite.Links[linkIndex]);
			updateLink.Title = title;
			updateLink.URL = url;
			copyOfLinks[linkIndex] = updateLink;
			// clean up
			setIsUpdate(false)
			setSelectedLink({});
		}
		copyOfSite.Links= copyOfLinks;
		dispatch(SiteActions.updateSite(copyOfSite));
		setAddEditVisible(false);
	}

	function handleCancel() {
		setAddEditVisible(false)
		setSelectedLink()
		setIsUpdate(false)
	}

	




}

export default Links;

