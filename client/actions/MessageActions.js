import {
  LOAD_MESSAGES_REQUEST,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_FAIL
} from '../constants/Page'

import api from '../api'

const MessageActions = {
  loadMessages() {
    return (dispatch) => {
      dispatch({
        type: LOAD_MESSAGES_REQUEST
      })

      api.loadMessages()
        .then(({ data }) => {
            dispatch({
              type: LOAD_MESSAGES_SUCCESS,
              messages: data
            })
          }
        )
        .catch(err =>
            dispatch({
              type: LOAD_MESSAGES_FAIL,
              error: err
            })
        );
    }
  },

  createMessage(data) {
    return (dispatch) => {
      api.createMessage(data)
        .then(() => {
          api.loadMessages()
            .then(({ data }) => {
                dispatch({
                  type: LOAD_MESSAGES_SUCCESS,
                  messages: data
                })
              }
            )
            .catch(err =>
                dispatch({
                  type: LOAD_MESSAGES_FAIL,
                  error: err
                })
            );
          }
        )
        .catch(err =>
            console.error(err)
        );
      }
  },

  deleteMessage(messageId) {
    api.deleteMessage(messageId)
      .then(() =>
          MessageActions.loadMessages()
      )
      .catch(err =>
          console.error(err)
      );
  }
}

export default MessageActions
