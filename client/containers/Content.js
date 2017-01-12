import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddForm from '../components/AddForm'
import Messages from '../components/Messages'
import MessageActions from '../actions/MessageActions'
import UserActions from '../actions/UserActions'

class Content extends Component {
  render() {
    const { messages } = this.props.page;
    const { loadMessages, createMessage, deleteMessage } = this.props.messageActions;

    return (
      <div className='content-page'>
        <AddForm createMessage={createMessage} />
       <Messages messages={messages} deleteMessage={deleteMessage}
         loadMessages={loadMessages} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    messageActions: bindActionCreators(MessageActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
