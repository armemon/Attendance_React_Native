import axios from "axios";

const serverUrl = "https://attendanceappserver-7ae04a82ac41.herokuapp.com/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};


export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};


export const loadDomainDataset = () => async (dispatch) => {
  try {
    dispatch({ type: "loadDomainDatasetRequest" });

    const { data } = await axios.get(`${serverUrl}/getDomainDataset`);
    dispatch({ type: "loadDomainDatasetSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadDomainDatasetFailure", payload: error.response.data.message });
  }
};

export const loadMeetingDataset = () => async (dispatch) => {
  try {
    dispatch({ type: "loadMeetingDatasetRequest" });

    const { data } = await axios.get(`${serverUrl}/getMeetingDataset`);
    dispatch({ type: "loadMeetingDatasetSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadMeetingDatasetFailure", payload: error.response.data.message });
  }
};

export const addDomainMember = (domain, memberName, year) => async (dispatch) => {
  try {
    dispatch({ type: "addDomainMemberRequest" });

    const { data } = await axios.post(
      `${serverUrl}/addDomainMember`,
      { domain, memberName, year },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addDomainMemberSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addDomainMemberFailure", payload: error.response.data.message });
  }
};

export const addMeeting = (domain, meeting) => async (dispatch) => {
  try {
    dispatch({ type: "addMeetingRequest" });

    const { data } = await axios.post(
      `${serverUrl}/addMeeting`,
      { domain, meeting },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addMeetingSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addMeetingFailure", payload: error.response.data.message });
  }
};

export const editMeeting = (selectedDataset, selectedMeetingID, editedMemberID, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "editMeetingRequest" });

    const { data } = await axios.put(
      `${serverUrl}/editMeeting`,
      { selectedDataset, selectedMeetingID, editedMemberID, updatedData},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "editMeetingSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "editMeetingFailure", payload: error.response.data.message });
  }
};

export const shiftMember = (currentDomain, newDomain, id) => async (dispatch) => {
  try {
    dispatch({ type: "shiftMemberRequest" });
    // console.log("Working")
    const { data } = await axios.put(
      `${serverUrl}/ShiftMember`,
      { currentDomain, newDomain, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "shiftMemberSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "shiftMemberFailure", payload: error.response.data.message });
  }
};

export const deleteMember = (domain, id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteMemberRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/DeleteMember`,
      {
        data: { domain, id },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "deleteMemberSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "deleteMemberFailure", payload: error.response.data.message });
  }
};