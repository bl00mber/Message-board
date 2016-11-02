import {
  GET_MESSAGES,
  CREATE_MESSAGE,
  DELETE_MESSAGE
} from '../constants/Page'

/* eslint-disable */

export function getMessages() {

  return (dispatch) => {
    dispatch({
      type: GET_MESSAGES
    })
  }

}

export function addMessage(name, userId, text, image) {

  return (dispatch) => {
    dispatch({
      type: CREATE_MESSAGE
    })
  }

}

export function removeMessage(messageId) {

  return (dispatch) => {
    dispatch({
      type: DELETE_MESSAGE
    })
  }

}

/* eslint-enable */
