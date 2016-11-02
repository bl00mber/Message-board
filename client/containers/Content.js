import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddForm from '../components/AddForm'
import Messages from '../components/Messages'
import * as pageActions from '../actions/PageActions'
import * as userActions from '../actions/UserActions'

class Content extends Component {
  render() {
    const { currentName, isLogged, currentUserId } = this.props.user
    const { messages } = this.props.page
    const { getMessages, addMessage, removeMessage } = this.props.pageActions

    return (
      <div className='content-page'>
        <AddForm currentName={currentName} isLogged={isLogged}
         currentUserId={currentUserId} addMessage={addMessage} />
        <Messages messages={messages} removeMessage={removeMessage}
         getMessages={getMessages} />
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
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
