import React, { createContext, useReducer } from 'react';

import reducer from './reducer';

// 初始化状态
const initState = {
  userInfo: {},
  couponApplyForm: {},
};

const Context = createContext(null);

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
