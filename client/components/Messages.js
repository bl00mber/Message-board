import React, { PropTypes, Component } from 'react'

import '../styles/Messages.styl'

export default class Messages extends Component {
  constructor() {
    super()
  }
  // componentWillMount() {
  //   this.props.getMessages()
  // }
  onRemoveBtnClick() {
    this.props.removeMessage()
  }
  render() {
    const { messages } = this.props

    return (
      <div className='messages_container'>
        {
          (messages.length !== 0) ?
          messages.map((item, index) =>
            <div key={index} className='msg_container'>
              <div className='msg_remove_button' onClick={::this.onRemoveBtnClick}></div>

              <div className='msg_image'></div>

              <p className='msg_creator_name'></p>
              <p className='msg_creator_id'></p>

              <p className='msg_text'></p>
              <p className='msg_text_more'>Load more...</p>
            </div> )
          :
          <p className='messages_not_found'>No notes here.</p>
        }
      </div>
    )
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  removeMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired
}
