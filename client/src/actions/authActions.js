import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER ,TOGGLE_USER_LOADING  } from "./types";
// import { resetPost } from "./postActions";
import { setErrors } from "./errorActions";

export const registerUser = (userData , history ) => {
    dispatch(toggleUserLoading());
    axios.post("/api/users/signup", userData).then(res => {
        
        dispatch(toggleUserLoading());

        localStorage.setItem(
            "loginMessage",
            "Successfully registered . Please login to continue"
        );
        history.push("/login");
    })
    .catch(err => {
        dispatch(setErrors(err.response.data));
        dispatch(toggleUserLoading())
    })


}

export const loginUser = userData => dispatch => {
    dispatch(toggleUserLoading());
    axios.post("/api/users/login",userData)
    .then(res => {
        dispatch(resetPost());
        const { token } = res.data;
        localStorage.setItem("jwtToken",token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch(toggleUserLoading());

    })
    .catch(err => {
        dispatch(setErrors(err.response.data));
        dispatch(toggleUserLoading());
    })
}

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload:userData
    }
}
export const toggleUserLoading = () => {
    return {
        type: TOGGLE_USER_LOADING,
        
    }
}
 export const logOutUser = () => dispatch => {
     localStorage.removeItem("jwtToken");
     setAuthToken(false);
     dispatch(setCurrentUser({}))
 }