import { ON_CHAT_MESSAGES_RECEIVED, ON_CHAT_ONLINE, ON_CHAT_OFFLINE} from '../actionTypes/chat';

export const onChatMessagesReceived = (data) => ({
  type: ON_CHAT_MESSAGES_RECEIVED,
  payload: data,
});

export const onChatOnline = (data) => ({
  type: ON_CHAT_ONLINE,
  paload: data,
});

export const onChatOffline = (data) => ({
  type: ON_CHAT_OFFLINE,
  paload: data,
});
