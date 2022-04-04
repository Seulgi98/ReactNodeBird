export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
}
// action creator
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
          ...state, //object 스프레드로 참조관계 유지
          isLoggedIn: true,
          user: action.data,
      }
    case 'LOG_OUT':
      return {
        ...state,
          ...state, //object 스프레드로 참조관계 유지
          isLoggedIn: false,
          user: null,
      }
    default:
      return state;
  }
};

export default reducer;