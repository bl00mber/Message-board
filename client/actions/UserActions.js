import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../constants/User'

/* eslint-disable */

export function logIn(username, password) {

  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS
    })

    dispatch({
      type: LOGIN_FAIL
    })
  }

}

export function signUp(username, password) {

  // let userIdArray = ["N","i","k","i",'t','a',3,'D','e',3,2,5,'F','G','g'];
  // let userId = userIdArray.sort(function(a,b){return 0.4*10<5}).slice(0,5);

  return (dispatch) => {
    dispatch({
      type: CREATE_MESSAGE
    })
  }

}

export function logOut() {

  return (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }

}

/* eslint-enable */
