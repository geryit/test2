/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';

import {
  SET_CONFIG, SET_URL, SET_PRACTICE, SET_LOCATION, ENTER_PATIENT_INFO,
  CHOOSE_SLOT, LOAD_APPT_REASONS,
  SET_SELECTED_APPT_REASON_ID, SET_EXTRACSS, SET_T, SET_LOGGED_IN_DOCTOR, SET_SPECIALTIES,
} from './actions';


export default combineReducers({
  config: (state = {}, { type, payload }) => {
    switch (type) {
      case SET_CONFIG:
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  URL: (state = {}, { type, url }) => {
    switch (type) {
      case SET_URL:
        return { ...state, ...url };
      default:
        return state;
    }
  },
  practice: (state = {}, action) => {
    switch (action.type) {
      case SET_PRACTICE:
        return action.payload;
      default:
        return state;
    }
  },
  location: (state = {}, action) => {
    switch (action.type) {
      case SET_LOCATION:
        return action.payload;
      default:
        return state;
    }
  },
  specialties: (state = [], action) => {
    switch (action.type) {
      case SET_SPECIALTIES:
        return action.payload;
      default:
        return state;
    }
  },
  patient: (state = {}, action) => {
    switch (action.type) {
      case ENTER_PATIENT_INFO:
        return action.payload;
      default:
        return state;
    }
  },
  appointmentSlot: (state = {}, action) => {
    switch (action.type) {
      case CHOOSE_SLOT:
        return action.payload;
      default:
        return state;
    }
  },
  appointmentReasons: (state = { reasonList: [], selectedApptReasonId: null }, action) => {
    switch (action.type) {
      case LOAD_APPT_REASONS:
        return { ...state, reasonList: action.apptReasons };
      case SET_SELECTED_APPT_REASON_ID:
        return { ...state, selectedApptReasonId: action.selectedApptReasonId };
      default:
        return state;
    }
  },
  extraCss: (state = {}, { type, payload }) => {
    switch (type) {
      case SET_EXTRACSS:
        return payload;
      default:
        return state;
    }
  },
  t: (state = {}, { type, payload }) => {
    switch (type) {
      case SET_T:
        return payload;
      default:
        return state;
    }
  },
  loggedInDoctor: (state = null, { type, doctor }) => {
    switch (type) {
      case SET_LOGGED_IN_DOCTOR:
        return doctor;
      default:
        return state;
    }
  },
});
