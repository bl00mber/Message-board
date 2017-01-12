import React, { PropTypes, Component } from 'react'

import '../styles/Messages.styl'

export default class Messages extends Component {
  constructor(props) {
    super(props)
    this.props.loadMessages();
  }
  onDeleteBtnClick = () => {
    this.props.deleteMessage()
  }
  expandBtn = (e) => {
    e.target.nextSibling.style.display = 'block';
    e.target.style.display = 'none';
  }
  render() {
    const { messages } = this.props

    return (
      <div className='messages_container'>
        {
          (messages.length !== 0) ?
          messages.map((item, index) => {
              let date = new Date(item.createdAt);
              date = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
              + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

              return <div key={index} className='msg_container'>
                <div className='msg_remove_button' onClick={this.onDeleteBtnClick}></div>

                <p className='msg_creator_name'>Created by
                  <span style={{color: item.color}}> {item.username}</span>
                </p>

                <p className='msg_date'>{date}</p>

                <p className='msg_text' dangerouslySetInnerHTML={{__html: item.text.slice(0, 700)}}></p>
                {
                  (item.text.length > 700) ?
                  <p className='msg_text_more' onClick={this.expandBtn}>Load more...</p> : ''
                }
                <p className='msg_text continue' dangerouslySetInnerHTML={{__html: item.text.slice(700)}}></p>
              </div>
            })
          :
          <p className='messages_not_found'>No messages here.</p>
        }
      </div>
    )
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  loadMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired
}
