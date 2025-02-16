import { createReducer, on } from "@ngrx/store";
import * as Actions from "./user-page-state.actions"
import { UserState } from "./user-page-state.state";

var initialStateOfUserPage: UserState = {
    User: {
        uid: 0,
        ugid: '',
        urid: 1,
        uFirstName: '',
        uLastName: '',
        uUserName: '',
        uEmail: '',
        uPhone: '',
    },
    ErrorMessage: "",
};

export const UserReducer = createReducer<UserState>(
    initialStateOfUserPage,

    on(Actions.loadUserSuccess, (state, { User }) => ({
        ...state,
        User: {
            uid: 0,
            ugid: '',
            urid: 1,
            uFirstName: User.uFirstName,
            uLastName: User.uLastName,
            uUserName: User.uUserName,
            uEmail: User.uEmail,
            uPhone: User.uPhone,
        }
    })),

    
    on(Actions.loadUserError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadUserByAdminSuccess, (state, { User }) => ({
        ...state,
        User: {
            uid: User.uid,
            ugid: User.ugid,
            urid: User.urid,
            uFirstName: User.uFirstName,
            uLastName: User.uLastName,
            uUserName: User.uUserName,
            uEmail: User.uEmail,
            uPhone: User.uPhone,
        }
    })),

    
    on(Actions.loadUserByAdminError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    
    on(Actions.saveUserError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    
    on(Actions.saveUserByAdminError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        User: {
            uid: 0,
            ugid: '',
            urid: 1,
            uFirstName: '',
            uLastName: '',
            uUserName: '',
            uEmail: '',
            uPhone: '',
        },
        ErrorMessage: "",
    })),
) 
