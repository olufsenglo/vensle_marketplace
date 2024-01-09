import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import AuthService from "services/auth.service";
  // import apiService from '../services/apiService'; 

  export const register = (name, email, password, password_confirmation) => (dispatch) => {
    return AuthService.register(name, email, password, password_confirmation).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.errors ? error.response.data.errors :
		      { dispatchError: error.response.data.message }

         /*const message =
         (error.response.data &&
           error.response &&
           error.response.data.message) ||
           error.message ||
           error.toString();
*/

        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: {type: "error", message},
        });


        return Promise.reject();
      }
    );
  };




  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
 
        dispatch({
          type: SET_MESSAGE,
          payload: {type: "success", message: "Login sucessfull"},
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.errors ? error.response.data.errors :
		      { dispatchError: error.response.data.message }

        dispatch({
          type: LOGIN_FAIL,
        });
  
	      console.log("errorzzz", error);

        dispatch({
          type: SET_MESSAGE,
          payload: {type: "error", message},
        });



        return Promise.reject();
      }
    );
  };


export const updateUserProfile = (userData) => (dispatch, getState) => {
    dispatch({
  	type: 'UPDATE_USER_PROFILE',
  	payload: userData,
    })
	
  localStorage.setItem('user', JSON.stringify(getState().auth.user));
}

//export const updateUserProfile = (userData) => ({
  //type: 'UPDATE_USER_PROFILE',
  //payload: userData,
//});
  
export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
