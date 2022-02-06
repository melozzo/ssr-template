import * as CalendarActions from './../actions/calendar-actions'




const initialState={
	calendarId : null
}

function calendarReducer( state = initialState, action){

	switch(action.type){
		case CalendarActions.SET_CALENDAR_ID:
			return {
				calendarId:action.ID
			}
			default:
				return state;
	}





}

export default calendarReducer;