import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";
import { ADD_MESSAGE, CLEAR_MESSAGES, REMOVE_MESSAGE } from '../types/messageTypes';

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  payload: id,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});
