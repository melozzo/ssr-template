import {
	SET_MAPS,
	SET_MAP,
	CREATED_MAP,
	DELETED_MAP,
	UPDATED_MAP,
	IS_EMPTY_MAP,
	fetchMaps,
	getLastMap
} from '../actions/map-actions'
import lodash from 'lodash'



const hardCodedDefaultMemberId = 1;

const initialState = {
	mapList:[],
	selectedMap: null,
	emptyMap: false,
}

function mapReducer(state = initialState, action) {
	console.log("entered mapReducer")
	const maps = lodash.cloneDeep(state.mapList)
	let idx
	switch (action.type) {
		case SET_MAPS:
			return {
				mapList: action.maps,
				selectedMap: state.selectedMap,
				emptyMap: state.emptyMap,
			}
		case SET_MAP:
			return {
				mapList: state.mapList,
				selectedMap: action.selectedMap,
				emptyMap: state.emptyMap,
			}
		case CREATED_MAP:
			maps.unshift(action.createdMap)
			return {
				mapList: maps,
				selectedMap: action.createdMap,
				emptyMap: true,
			}

		case UPDATED_MAP:
			const map = maps.find((m) => m.MapID === action.updatedMap.MapID)
			idx = maps.indexOf(map)
			maps[idx] = action.updatedMap
			return {
				mapList: maps,
				selectedMap: action.updatedMap,
			}

		case DELETED_MAP:
			const deleted = maps.find(
				(m) => m.MapID === action.deletedMap.MapID
			)
			idx = maps.indexOf(deleted)
			maps.splice(idx, 1)
			return {
				mapList: maps,
				selectedMap: null,
			}

		case IS_EMPTY_MAP:
			return {
				mapList: state.mapList,
				selectedMap: state.selectedMap,
				emptyMap: action.isEmpty,
			}

		default:
			return state
	}
}

export default mapReducer
