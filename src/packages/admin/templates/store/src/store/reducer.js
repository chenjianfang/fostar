// 组合reducers
function combineReducers(reducers = {}) {
  return (state, action) => {
    const stateRoot = {};
    Object.entries(reducers).forEach((item) => {
      const [key, fun] = item;
      stateRoot[key] = fun(state[key], action);
    });
    return stateRoot;
  };
}

// 用户信息
function userInfo(state, { type, data }) {
  switch (type) {
    case 'setUserInfo':
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}

export default combineReducers({
  userInfo,
});
