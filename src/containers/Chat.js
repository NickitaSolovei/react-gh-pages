import React from 'react';
import {connect} from 'react-redux';
import { onChatMessagesReceived, onChatOnline, onChatOffline } from '../actions/chat';
import Header from '../components/Header';

import styles from '../components/main.module.css';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.userNameRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== 'granted') { Notification.requestPermission(); }
    });


    function notifyMe(data) {
      if (Notification.permission !== 'granted') { Notification.requestPermission(); } else if (document.hidden) {
        // eslint-disable-next-line no-new
        new Notification(data.from, {
          body: data.message,
        });
      }
    }

    const startSocket = () => {
      this.socket = new WebSocket('ws://st-chat.shas.tel');
      this.props.onChatOnline();
      // global.SSS = this.socket;

      this.socket.onmessage = (event) => {
        const message = event.data;
        const data = JSON.parse(message);
        this.props.onChatMessagesReceived(data);
        notifyMe(data[data.length - 1]);
      };
      this.socket.onclose = () => {
        this.props.onChatOffline();
        setTimeout(() => { startSocket(); }, 5000);
      };
    };
    startSocket();


    this.scrollToBottom();
  }


  componentDidUpdate() {
    this.scrollToBottom();
  }

  // getUserNameFromLocalStorage = () => localStorage.getItem('userName');
  getUserNameFromLocalStorage() {
    return localStorage.getItem('userName');
  }

  // scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView();
  // }
  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }


  sendMessageToServer() {
    const mes = {message: this.inputRef.current.value, from: this.getUserNameFromLocalStorage()};
    this.socket.send(JSON.stringify(mes));
  }

  render() {
    return (
      <>
        <div className={styles.fullscreen}>
          <Header
            className={styles.headerClass}
            isOnline={this.props.chat.isChatOnline}
            getUserNameFromLocalStorage={this.getUserNameFromLocalStorage}
            userNameRef={this.userNameRef}
          />

          <div className={styles.wrapmessages}>
            <div className={styles.messages} id="messages">
              <div className={styles.headerMessages}>
                {this.props.chat.messages.map((el) => {
                  const timeFormat = new Date(el.time).toTimeString().replace(/ .*/, '');
                  return (
                    <div className={styles.messageContainer}>
                      <div className={styles.messageFirstLine}>
                        <div className={styles.messageFrom}>{el.from}</div>
                        <div className={styles.messageTime}>{timeFormat}</div>
                      </div>
                      <div className={styles.messageSecondLine}>{el.message}</div>
                    </div>
                  );
                })}

                <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={(el) => { this.messagesEnd = el; }}
                />

              </div>
            </div>
            <input
              className={styles.messageBottom}
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
        </div>
      </>
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
    onChatMessagesReceived: (data) => dispatch(onChatMessagesReceived(data)),
    onChatOnline: (data) => dispatch(onChatOnline(data)),
    onChatOffline: (data) => dispatch(onChatOffline(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
