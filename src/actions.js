
export const SET_CONFIG = 'setConfig';
export const SET_URL = 'setURL';
export const SET_PRACTICE = 'setPractice';
export const SET_LOCATION = 'setLocation';
export const ENTER_PATIENT_INFO = 'enterPatientInfo';
export const CHOOSE_SLOT = 'chooseSlot';
export const LOAD_APPT_REASONS = 'loadApptReasons';
export const SET_SELECTED_APPT_REASON_ID = 'setSelectedApptReasonId';
export const SET_EXTRACSS = 'setExtraCss';
export const SET_T = 'setT';
export const SET_LOGGED_IN_DOCTOR = 'setLoggedInDoctor';
export const SET_SPECIALTIES = 'setSpecialties';

export const setConfig = (payload) => ({
  type: SET_CONFIG,
  payload,
});

export const setURL = (url) => ({
  type: SET_URL,
  url,
});

export const setPractice = (payload) => ({
  type: SET_PRACTICE,
  payload,
});

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
});

export const setSpecialties = (payload) => ({
  type: SET_SPECIALTIES,
  payload,
});


export const enterPatientInfo = ({ firstName, lastName, phoneNumber }) => ({
  type: ENTER_PATIENT_INFO,
  payload: { firstName, lastName, phoneNumber },
});

export const chooseSlot = (slot) => ({
  type: CHOOSE_SLOT,
  payload: slot,
});

export const loadApptReasons = (apptReasons) => ({
  type: LOAD_APPT_REASONS,
  apptReasons,
});

export const setSelectedApptReasonId = (apptReason) => ({
  type: SET_SELECTED_APPT_REASON_ID,
  selectedApptReasonId: apptReason.id,
});

export const setExtraCss = (payload) => ({
  type: SET_EXTRACSS,
  payload,
});

export const setT = (payload) => ({
  type: SET_T,
  payload,
});

export const setLoggedInDoctor = (doctor) => ({
  type: SET_LOGGED_IN_DOCTOR,
  doctor,
});

