import {
  LOAD_MESSAGES_REQUEST,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_FAIL
} from '../constants/Page'

const initialState = {
  messages: [],
  error: ''
}

export default function page(state = initialState, action) {

  switch (action.type) {
    case LOAD_MESSAGES_REQUEST:
      return { ...state, error: '' }

    case LOAD_MESSAGES_SUCCESS:
      return { ...state, messages: action.messages, error: '' }

    case LOAD_MESSAGES_FAIL:
      return { ...state, error: action.error }

    default:
      return state;
  }

}
