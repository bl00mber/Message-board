import React, { PropTypes, Component } from 'react'

import '../styles/AddForm.styl'

export default class AddForm extends Component {
  constructor() {
    super()
    this.state = { btnIsDisabled: false };
  }
  formatText = (e) => {
    let tag = e.target.textContent.toLowerCase(),
        textNode = this.refs.text,
        value = textNode.value,
        selStart = textNode.selectionStart,
        selEnd = textNode.selectionEnd,
        selText = value.substr(selStart, selEnd-selStart),
        newSelText = '[' + tag + ']' + selText + '[/' + tag + ']';

    this.refs.text.value = value.replace(selText, newSelText);

    textNode.focus();
    textNode.selectionStart = (selStart + 3);
    textNode.selectionEnd = (selEnd + 3);
  }
  onAddBtnClick = () => {
    this.setState({ btnIsDisabled: true });
    const { createMessage } = this.props;

    let data = { text: this.refs.text.value };

    if (data.text == '') {
      return this.showWarningMessage()
    }

    createMessage(data)
    this.refs.text.value = '';
    this.setState({ btnIsDisabled: false });
  }
  addLorem = () => {
    this.refs.text.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
  showWarningMessage() {
    this.refs.tooltip.style.opacity = 0.8;

    setTimeout(() => {
      this.refs.tooltip.style.opacity = 0;
    }, 3000);
  }
  render() {
    return (
      <div className='add_container'>
        <div className='add_top_btns_container'>
          <div className='add_format_btn'>
            <div className='add_btn' onClick={this.formatText}>B</div>
            <div className='add_btn' onClick={this.formatText}>I</div>
            <div className='add_btn' onClick={this.formatText}>S</div>
          </div>
          <div className='add_btn'
           onClick={this.addLorem}>Lorem Ipsum</div>
        </div>

        <textarea className='add_text' type='textarea'
         placeholder='Enter text here...' defaultValue=''
         ref='text' spellCheck='false' />

        <div className='add_text_tooltip' ref='tooltip'>Please enter text !</div>

        <div className='add_btn create' onClick={this.onAddBtnClick}
         disabled={this.state.btnIsDisabled}>Create post</div>
      </div>
    )
  }
}

AddForm.propTypes = {
  createMessage: PropTypes.func.isRequired
}
