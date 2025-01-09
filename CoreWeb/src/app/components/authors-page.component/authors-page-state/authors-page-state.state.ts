export const featureKeyAuthorsState = 'authors-page-state';

export interface AuthorsState {
    Authors: any[],
    Author: {
        AGID: string,
        AFirstName: string,
        AMiddleName: string,
        ALastName: string,
        ANickName: string,
        ANationality: string,
    },
    Filters: {
        Skip: number,
        Take: number,
    },
    AuthorsCount: number,
    ErrorMessage: string,
}