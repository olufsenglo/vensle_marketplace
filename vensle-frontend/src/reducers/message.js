import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";
import { ADD_MESSAGE, CLEAR_MESSAGES, REMOVE_MESSAGE } from '../types/messageTypes';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { id: Date.now(), ...action.payload }],
      };

    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      };		  

    case CLEAR_MESSAGE:
      return { message: "" };

    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };		  

    default:
      return state;
  }
}
