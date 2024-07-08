import { SET_LOCATION } from '../types/locationTypes';

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});
