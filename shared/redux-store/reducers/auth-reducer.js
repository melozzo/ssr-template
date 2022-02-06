import * as AuthActions from '../actions/auth-actions';



const initialState = {
      authenticatedMember: null,
      readOnly:false,
      justLoggedIn:false
}

function memberReducer( state = initialState, action ){

      switch(action.type){
            case AuthActions.SET_AUTHENTICATED:    
                  return {
                        authenticatedMember:action.member,
                        readOnly:state.readOnly,
                        justLoggedIn:state.loggedIn
                  }
            case AuthActions.SET_READ_ONLY:
                        return {
                              authenticatedMember:state.authenticatedMember,
                              readOnly:action.value,
                              justLoggedIn:state.loggedIn
                        }
            case AuthActions.LOGIN_SUCCESS:
                  return {
                        authenticatedMember:state.authenticatedMember,
                        readOnly:state.readOnly,
                        justLoggedIn: true

                  }
                  case AuthActions.LOG_OUT:
                        return {
                              authenticatedMember:state.authenticatedMember,
                              readOnly:state.readOnly,
                              justLoggedIn:false
                        }
            default: 
                  return state;
            
      }
      
}

export default memberReducer;