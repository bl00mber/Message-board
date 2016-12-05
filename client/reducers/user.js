import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../constants/User'

const initialState = {
  currentName: 'Anonym',
  isLogged: false,
  color: '#202020',
  error: ''
}

export default function user(state = initialState, action) {

  switch(action.type) {
    case LOGIN_SUCCESS:
      return {...state, currentName: action.payload.currentName,
        color: action.payload.color, isLogged: true, error: '' }

    case LOGIN_FAIL:
      return {...state, currentName: 'Anonym', isLogged: false,
        color: '#202020', error: action.error }

    case LOGOUT_SUCCESS:
      return {...state, currentName: 'Anonym', isLogged: false,
        color: '#202020', error: '' }

    default:
      return state
  }

}
