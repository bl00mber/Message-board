import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../constants/User'

const initialState = {
  currentName: 'Anonym',
  isLogged: false,
  currentUserId: '',
  error: ''
}

export default function user(state = initialState, action) {

  switch(action.type) {
    case LOGIN_SUCCESS:
      return {...state, currentName: action.payload.currentName,
        isLogged: true, currentUserId: action.payload.currentUserId, error: '' }

    case LOGIN_FAIL:
      return {...state, currentName: 'Anonym', isLogged: false,
        currentUserId: '', error: action.payload.error }

    case LOGOUT_SUCCESS:
      return {...state, currentName: 'Anonym', isLogged: false,
        currentUserId: '', error: '' }

    default:
      return state
  }

}
