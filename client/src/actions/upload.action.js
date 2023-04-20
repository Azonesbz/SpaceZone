export const setFile = (file) => ({
    type: "SET_FILE",
    payload: file,
  });
  
  export const uploadStarted = () => ({
    type: "UPLOAD_STARTED",
  });
  
  export const uploadSuccess = () => ({
    type: "UPLOAD_SUCCESS",
  });
  
  export const uploadError = (error) => ({
    type: "UPLOAD_ERROR",
    payload: error,
  });