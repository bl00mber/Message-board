import { browserHistory } from 'react-router'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../constants/User'

import api from '../api'

const UserActions = {
  _loginHandler(dispatch, data) {
    api.logIn(data)
      .then(({ data }) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              currentName: data.username,
              color: data.color
            }
          })
          browserHistory.push('/')
        }
      )
      .catch(err =>
          dispatch({
            type: LOGIN_FAIL,
            error: err
          })
      );
  },

  logIn(data) {
    return (dispatch) => {
      UserActions._loginHandler(dispatch, data)
    }
  },

  signUp(data) {
    return (dispatch) => {
      api.createUser(data)
        .then(({ data }) => {
          UserActions._loginHandler(dispatch, data)
        })
        .catch(err =>
            dispatch({
              type: LOGIN_FAIL,
              error: err
            })
        );
    }
  },

  restoreSession() {
    return (dispatch) => {
      api.restoreSession()
        .then(({ data }) => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                currentName: data.username,
                color: data.color
              }
            })
          }
        )
        .catch(err =>
            dispatch({
              type: LOGOUT_SUCCESS,
              error: err
            })
        );
    }
  },

  logOut() {
    return (dispatch) => {
      api.logOut()
        .then(() =>
          dispatch({
            type: LOGOUT_SUCCESS
          })
        )
        .catch(err =>
            console.error(err)
        );
    }
  }
}

export default UserActions
