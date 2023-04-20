const initialState = {
    file: null,
    status: "idle",
    error: null,
  };
  
  export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_FILE":
        return {
          ...state,
          file: action.payload,
        };
      case "UPLOAD_STARTED":
        return {
          ...state,
          status: "loading",
          error: null,
        };
      case "UPLOAD_SUCCESS":
        return {
          ...state,
          status: "success",
          error: null,
        };
      case "UPLOAD_ERROR":
        return {
          ...state,
          status: "error",
          error: action.payload,
        };
      default:
        return state;
    }
  };