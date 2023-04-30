import axios from "axios";
import { LoginFailure, LoginStart, LoginSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(LoginStart());

  try {
    const res = await axios.post("auth/login", user);
    res.data.isAdmin && dispatch(LoginSuccess(res.data));
  } catch (e) {
    dispatch(LoginFailure());
  }
};
