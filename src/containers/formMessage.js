import React from 'react';
import {connect} from 'react-redux';

import TextareaAutosize from 'react-textarea-autosize';

import { onChatMessagesReceived } from '../actions/chat';

// import styles from './main.module.css';
// import styles from '../components/main/main.module.css';


class FormMessage extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.userNameRef = React.createRef();

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  sendMessageToServer() {
    const mes = {message: this.inputRef.current.value, from: this.getUserNameFromLocalStorage()};
    this.props.socket.send(JSON.stringify(mes));
  }


    getUserNameFromLocalStorage = () => localStorage.getItem('userName')


    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit() {
      // alert('Сочинение отправлено: ' + this.state.value);
      // event.preventDefault();
      const mes = {message: this.state.value, from: this.getUserNameFromLocalStorage()};
      // this.socket.send(JSON.stringify(mes));
      this.props.socket.send(JSON.stringify(mes));
    }

    render() {
      return (
        <div>
          {/* <form name="publish" className={styles.messageBottom}></form> */}
          <form name="publish" className="" onSubmit={this.handleSubmit}>
            {/* <div class="form-group"  name="publish"> */}
            {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
            <TextareaAutosize
              className="form-control"
              name="message"
              style={{boxSizing: 'border-box'}}
              minRows={3}
              maxRows={10}
              placeholder="Write a message..."

              value={this.state.value}
              onChange={this.handleChange}
            />
            <input onClick={this.sendMessageToServer} className="" type="submit" value="Отправить" />


          </form>

          <input
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.sendMessageToServer();
                this.inputRef.current.value = '';
              }
            }}
            type="text"
            ref={this.inputRef}
          />

        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    chat: state.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChatMessagesReceived: (data) => {
      dispatch(onChatMessagesReceived(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMessage);
