import { createReducer, on } from "@ngrx/store";
import * as Actions from "./authors-page-state.actions"
import { AuthorsState } from "./authors-page-state.state";

var initialStateOfAuthorsPage: AuthorsState = {
    Authors: [],
    Author: {
        AGID: "",
        AFirstName: "",
        AMiddleName: "",
        ALastName: "",
        ANickName: "",
        ANationality: "",
    },
    Filters: {
        Skip: 0,
        Take: 10,
    },
    AuthorsCount: 0,
    ErrorMessage: "",
};

export const AuthorsReducer = createReducer<AuthorsState>(
    initialStateOfAuthorsPage,

    //Load Author
    on(Actions.loadAuthorSuccess, (state, { Author }) => ({
        ...state,
        Author: {
            AGID: Author.agid,
            AFirstName: Author.aFirstName,
            AMiddleName: Author.aMiddleName,
            ALastName: Author.aLastName,
            ANickName: Author.aNickName,
            ANationality: Author.aNationality
        },
    })),
    
    on(Actions.loadAuthorError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Authors
    on(Actions.loadAuthorsSuccess, (state, { Authors }) => ({
        ...state,
        Authors: Authors.list,
        AuthorsCount: Authors.count
    })),

    on(Actions.loadAuthorsError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Save Author 
    on(Actions.addAuthorSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addAuthorError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Update Author 
    on(Actions.updateAuthorSuccess, (state) => ({
        ...state,
    })),
    
    on(Actions.updateAuthorError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Author
    on(Actions.deleteAuthorSuccess, (state, { agid }) => {
        let newAuthors = [...state.Authors];

        let authorsWithoutDeletedAuthor = newAuthors.filter(x => x.agid != agid);

        return {...state, Authors: authorsWithoutDeletedAuthor};
    }),

    on(Actions.deleteAuthorError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Filters
    on(Actions.updatePaginationDataAuthors, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        Authors: [],
        Author: {
            AGID: "",
            AFirstName: "",
            AMiddleName: "",
            ALastName: "",
            ANickName: "",
            ANationality: "",
        },
        Filters: {
            Skip: 0,
            Take: 10,
        },
        AuthorsCount: 0,
        ErrorMessage: "",
    })),
) 
