import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import instance from "../components/axios.js";

// Register User
export const registerUser = (formData, history) => (dispatch) => {
    instance
        .post("/signup", formData)
        .then((res) => {
            console.log(res.data);
            return res.data;
            // if (res.data.errors) {

            // }
            // history.push("/login");
        }) // re-direct to login on successful register
        .catch((err) => {
            console.log("authAction err for register");
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

// Login - get user token
export const loginUser = (formData) => (dispatch) => {
    instance
        .post("/login", formData)
        .then((res) => {
            console.log("start of authAction for logging in");
            // Save to localStorage
            // Set token to localStorage
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            console.log("end of authAction for logging in");
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    };
};

// Log user out
export const logoutUser = () => (dispatch) => {
    console.log("action for logout");
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    return "logged out";
};
