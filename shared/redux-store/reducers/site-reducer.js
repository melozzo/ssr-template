
import * as SiteActions from './../actions/site-actions';
import lodash from 'lodash'


const initialState = {
      siteList:[],
      selectedSite:null
}

function siteReducer( state = initialState, action ){
	const sites = lodash.cloneDeep(state.siteList);
	let idx;
      switch(action.type){
            case SiteActions.SET_SITES:
                  return {
                        siteList:action.sites,
                        seletedSite: state.selectedSite
                  }
		
		case SiteActions.SET_SITE:
			return {
				siteList: state.siteList,
				selectedSite: action.selectedSite
			}

		case SiteActions.CREATED_SITE:
			sites.push(action.createdSite);
			return {
				siteList: sites,
				selectedSite:action.createdSite
			}

		case SiteActions.UPDATED_SITE:
			const site = sites.find( s => s.SiteID === action.updatedSite.SiteID)
			idx = sites.indexOf(site);
			sites[idx ] = action.updatedSite;
			return {
				siteList:sites,
				selectedSite: action.updatedSite
			}

		case SiteActions.DELETED_SITE:
			idx = sites.indexOf(action.deletedSite);
			sites.splice(idx, 1);
			return {
				siteList:sites,
				selectedSite:null
			}

           
       
            
            default: 
                  return state;
            
      }
      
}

export default siteReducer;