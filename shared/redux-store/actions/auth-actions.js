import axios from 'axios';


export const LOGIN = 'LOGIN';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_READ_ONLY = "SET_READ_ONLY";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';


//  let memberId=46996;// email white@album pwd snow
const baseURL=  'http://138.68.12.0:8080'  //'http://localhost:8080';   /


export const checkSavedCredentials = ()=>{
      return async dispatch =>{
            try{
                  const foundEmail = null; //await AsyncStorage.getItem("@traveloggia.email");
                  const foundPwd = null; //await AsyncStorage.getItem("@traveloggia.pwd");
                  if(foundEmail !== null && foundPwd !== null)
                        dispatch(login(foundEmail, foundPwd));
            }catch(error){
                  console.log(error.message)
            }
      }     
}

export const login = ( {email, password } )=>{ 
    //  console.log('auth action login entered', email, password)
      return async dispatch =>{
           try{
                  const axiosConfig={
                        method: 'POST',
                        url: `${baseURL}/member/login`,
                        headers: {'Content-Type':'application/json'},
                        data: {Email: email, Password: password}
                  }

            const foundMember = await axios(axiosConfig);
                  const mel = foundMember.data;
                  //console.log('member returned', mel)
                  dispatch({type:SET_AUTHENTICATED,member: mel})
            
                  dispatch({type:SET_READ_ONLY, value:false})

           }catch( error ){
                  alert('error logging in ', error)

           }
          
      }
}

export const createAccount = (creds)=>{ 
      console.log('create account action')
      return async dispatch =>{
            try{
                  const axiosConfig={
                        method: 'POST',
                        url: `${baseURL}/member/create`,
                        headers: {'Content-Type':'application/json'},
                        data: {Email:creds.email, Password:creds.password}
                  }

                  const created = await axios(axiosConfig);
                  console.log('returning authenticated member' )
                  dispatch({type:SET_AUTHENTICATED,member: created.data});
                  dispatch({type:SET_READ_ONLY, value:false})
                  dispatch({type:LOGIN_SUCCESS})
            }catch(error){
                  console.log('error createing member', error)
            }
          
            
      }
}

