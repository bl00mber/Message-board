import {
  GET_MESSAGES,
  CREATE_MESSAGE,
  DELETE_MESSAGE
} from '../constants/Page'

const initialState = {
  messages: []
}

export default function page(state = initialState, action) {

  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.messages }

    case CREATE_MESSAGE:
      return { ...state, messages: action.messages }

    case DELETE_MESSAGE:
      return { ...state, messages: action.messages }

    default:
      return state;
  }

}
