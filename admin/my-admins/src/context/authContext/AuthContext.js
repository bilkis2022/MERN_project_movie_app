import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("movieUser")) || null,
  isFetching: false,
  error: false,
};

export const Auth_context = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    
    localStorage.setItem("movieUser", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Auth_context.Provider
    
    value={{
        user: state.user,
        isFetching : state.isFetching,
        error : false,
        dispatch
    }}

    >
        {children}
    </Auth_context.Provider>
  )
  
};
