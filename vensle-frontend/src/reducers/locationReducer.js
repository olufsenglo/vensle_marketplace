import { SET_LOCATION } from '../types/locationTypes';

const initialState = {
  city: '',
  country: '',
  countryCode: '',
  lat: '',
  lng: '',
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
