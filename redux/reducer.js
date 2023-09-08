import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      // state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // registerRequest: (state) => {
    //   state.loading = true;
    // },
    // registerSuccess: (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = true;
    //   state.user = action.payload.user;
    //   state.message = action.payload.message;
    // },
    // registerFailure: (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = false;
    //   state.error = action.payload;
    // },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      // state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    // verificationRequest: (state) => {
    //   state.loading = true;
    // },
    // verificationSuccess: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // },
    // verificationFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const datasetReducer = createReducer(
  {},
  {
    loadMeetingDatasetRequest: (state) => {
      state.datasetloading = true;
    },
    loadMeetingDatasetSuccess: (state, action) => {
      state.datasetloading = false;
      state.meetingDataset = action.payload.meetingDataset;
      // state.message1 = action.payload.message;
    },
    loadMeetingDatasetFailure: (state, action) => {
      state.datasetloading = false;
      state.error1 = action.payload;
    },
    loadDomainDatasetRequest: (state) => {
      state.datasetloading = true;
    },
    loadDomainDatasetSuccess: (state, action) => {
      state.datasetloading = false;
      state.domainDataset = action.payload.domainDataset;
      // state.message1 = action.payload.message;
    },
    loadDomainDatasetFailure: (state, action) => {
      state.datasetloading = false;
      state.error1 = action.payload;
    },
    addDomainMemberRequest: (state) => {
      state.loading1 = true;
    },
    addDomainMemberSuccess: (state, action) => {
      state.loading1 = false;
      state.domainMembers = action.payload.data; // Update the domain members
      state.message1 = action.payload.message;

    },
    addDomainMemberFailure: (state, action) => {
      state.loading1 = false;
      state.error1 = action.payload;
    },
    addMeetingRequest: (state) => {
      state.loading1 = true;
    },
    addMeetingSuccess: (state, action) => {
      state.loading1 = false;
      state.meetings = action.payload.data; // Update the meetings
      state.message1 = action.payload.message;
    },
    addMeetingFailure: (state, action) => {
      state.loading1 = false;
      state.error1 = action.payload;
    },
    editMeetingRequest: (state) => {
      state.loading1 = true;
    },
    editMeetingSuccess: (state, action) => {
      state.loading1 = false;
      state.editedMeetingData = action.payload.data;
      state.message1 = action.payload.message;
    },
    editMeetingFailure: (state, action) => {
      state.loading1 = false;
      state.error1 = action.payload;
    },
    
    shiftMemberRequest: (state) => {
      state.loading1 = true;
    },
    shiftMemberSuccess: (state, action) => {
      state.loading1 = false;
      state.domainDataset = action.payload.data;
      state.message1 = action.payload.message;
    },
    shiftMemberFailure: (state, action) => {
      state.loading1 = false;
      state.error1 = action.payload;
    },
    deleteMemberRequest: (state) => {
      state.loading1 = true;
    },
    deleteMemberSuccess: (state, action) => {
      state.loading1 = false;
      state.domainDataset = action.payload.data;
      state.message1 = action.payload.message;
    },
    deleteMemberFailure: (state, action) => {
      state.loading1 = false;
      state.error1 = action.payload;
    },

    clearError1: (state) => {
      state.error1 = null;
    },

    clearMessage1: (state) => {
      state.message1 = null;
    },
  }
);