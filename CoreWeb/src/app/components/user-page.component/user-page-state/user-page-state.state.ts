export const featureKeyUserState = 'user-page-state';

export interface UserState {
    User: {
        uid: number,
        ugid: string,
        urid: number,
        uFirstName: string,
        uLastName: string,
        uUserName: string,
        uEmail: string,
        uPhone: string,
    },
    ErrorMessage: string,
}