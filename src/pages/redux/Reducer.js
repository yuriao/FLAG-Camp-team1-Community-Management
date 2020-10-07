const initialState = { name: "" }

function loginReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'login') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      name: action.payload
    }
  }
  // otherwise return the existing state unchanged
  return state;
}

export default loginReducer;
 