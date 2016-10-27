import React, { PropTypes, Component } from 'react'

import '../styles/AddForm.styl'

export default class AddForm extends Component {
  constructor() {
    super()
    this.state = { btnIsDisabled: false }
  }
  onValidate() {
    console.log(this)
  }
  onAddBtnClick() {
    console.log(this)
  }
  render() {
    // const { currentName, isLogged, currentUserId, addMessage } = this.props

    return (
      <div className='add_container'>
      <form className='add_container'>
        <div className='add_top_btns_container'>
          <div className='add_format_btn'>
            <div className='add_btn'>B</div>
            <div className='add_btn'>I</div>
            <div className='add_btn'>S</div>
          </div>
          <div className='add_btn'>Lorem Ipsum</div>
        </div>

        <textarea className='add_text' type='textarea'
         placeholder='Enter text here...' defaultValue=''
         ref='text' onChange={::this.onValidate}/>

        <div className='add_drag-n-drop'>
          Drag and drop your image here
        </div>

        <div className='add_img'>
          <div></div>
          <p>Current image</p>
        </div>

        <div
          className='add_btn create' onClick={::this.onAddBtnClick}
          disabled={this.state.btnIsDisabled}
        >Create post</div>
      </form>
      </div>
    )
  }
}

AddForm.propTypes = {
  currentName: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  currentUserId: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired
}
