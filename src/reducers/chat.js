import { ON_CHAT_MESSAGES_RECEIVED, ON_CHAT_ONLINE, ON_CHAT_OFFLINE } from '../actionTypes/chat';

const initialState = {
  messages: [],
  isChatOnline: false,
};


export default function chat(state = initialState, action) {
  switch (action.type) {
  case ON_CHAT_MESSAGES_RECEIVED: {
    const newState = { ...state};
    // newState.messages = newState.messages.concat(action.payload);
    newState.messages = newState.messages.concat(action.payload.reverse());
    return newState;
  }
  case ON_CHAT_ONLINE: {
    const newState = { ...state};
    newState.messages = [];
    newState.isChatOnline = true;
    return newState;
  }
  case ON_CHAT_OFFLINE: {
    const newState = { ...state};
    newState.isChatOnline = false;
    return newState;
  }
  default:
    return state;
  }
}
