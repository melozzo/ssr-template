import React, { useEffect } from 'react';
import Moment from 'moment';

export const SET_CALENDAR_ID = 'SET_CALENDAR_ID';

async function getCalendar(){
	console.log('entered get Calendar')
	
		const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
		console.log('cal count is', calendars.length)
		const eventCalendar = calendars.find(c => c.title = "Calendar")
		return eventCalendar.id;
		
	
}

export const requestCalendarPermission = () => {
	return async dispatch => {
		const { status } = await Calendar.requestCalendarPermissionsAsync();
		if (status === 'granted') {
			const calId = await getCalendar();
			console.log('dispatching cal', calId)
			dispatch({ type: SET_CALENDAR_ID, ID: calId })
		}
	}
}

export const checkCalendarPermission=()=>{
	console.log('checking calendar permission')
	return async dispatch =>{
		const { status } = await Calendar.getCalendarPermissionsAsync();
		console.log('calendar permission: ' ,status)
		if (status === 'granted') {
			getCalendar();
		}
	}
}



export const loadCalendarEvents = (siteList, calendarId) => {
	console.log('loading calendar events cal id :', calendarId)
	return async dispatch => {
		const objRange = getStartEnd(siteList)
		const start = Moment(objRange.start).toDate();
		const end = Moment(objRange.end).toDate();
		const events = await Calendar.getEventsAsync( [calendarId], start, end);
		console.log( 'events found', events.length)
		await addTraveloggiaEvents(events, siteList, calendarId)
	}
}

async function addTraveloggiaEvents( events, siteList, calendarId){
	for( let x=0; x< siteList.length; x++){
		const site = siteList[x];
		if ( site.Arrival && site.Departure){
			const found = events.find( e => e.title === site.Name );
			if ( ! found ){
				const details = {
					'title':site.Name,
					'startDate':site.Arrival,
					'endDate': site.Departure,
					'notes':site.Description
				}
				const added = await Calendar.createEventAsync(calendarId, details)
				console.log(`${site.Name} event added`)
			}
			
		}

	}


}

function getStartEnd(siteList){
	const arrivals=[];
	const departures=[];

	for( let x=0; x< siteList.length; x++){
		const site = siteList[x];
		if( site.Arrival)
			arrivals.push(site.Arrival);
		if(site.Departure)
			departures.push(site.Departure)
	}

	arrivals.sort( getEarliest );
	departures.sort( getLatest)

	return {
		start: arrivals[0],
		end: departures[0]
	}

	function getLatest( a, b ){
		if(Moment(a).isBefore(Moment(b)))
			return 1;
		else if ( Moment(a).isAfter( Moment(b)))
			return -1;
		else 
			return 0;

	}

	function getEarliest( a, b ){
		if(Moment(a).isBefore(Moment(b)))
			return -1;
		else if ( Moment(a).isAfter( Moment(b)))
			return 1;
		else 
			return 0;

	}
}

