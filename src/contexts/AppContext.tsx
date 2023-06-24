import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axios";
import { getUserById } from "../api/userApi";

type State = typeof initialState;
type Action = { type: string; payload?: any };

// initial state
const initialState = {
  isNavMenuOpen: false,
  language: "en",
  currentUser: null,
};

const handlers = {
  TOGGLE_NAV_MENU: (state: State, action: Action) => {
    return {
      ...state,
      isNavMenuOpen: !state.isNavMenuOpen,
    };
  },
  SET_LANGUAGE: (state: State, action: Action) => {
    return {
      ...state,
      language: action.payload,
    };
  },
  LOGOUT: (state: any) => {
    window.localStorage.removeItem("accessToken");
    return {
      ...state,
      currentUser: null,
    };
  },
  SET_CURRENT_USER: (state: State, action: Action) => {
    return {
      ...state,
      currentUser: action.payload,
    };
  },
};

const reducer = (state: State, action: Action) =>
  handlers[action.type as keyof typeof handlers]
    ? handlers[action.type as keyof typeof handlers](state, action)
    : state;

// Create the context
export const AppContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

// Create the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
          const user = await getUserById(+accessToken);

          dispatch({
            type: "SET_CURRENT_USER",
            payload: user,
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: "LOGOUT" });
      }
    };

    initialize();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
