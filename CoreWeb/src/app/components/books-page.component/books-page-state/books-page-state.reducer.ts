import { createReducer, on } from "@ngrx/store";
import * as Actions from "./books-page-state.actions"
import { BooksState } from "./books-page-state.state";
import { GenreEnum } from "../../../enums/GenreEnum";
import { Guid } from "guid-typescript";

var initialStateOfBooksPage: BooksState = {
    Books: [],
    Authors: [],
    Publishers: [],
    Book: {
        BGID: "",
        BAuthorGID: "",
        BPublisherGID: "",
        BTitle: "",
        BISBN: "",
        BGenre: GenreEnum.Fable,
        BLanguage: "",
        BDescription: "",
    },
    Filters: {
        Skip: 0,
        Take: 10,
        Genre: GenreEnum.All,
        Author: Guid.EMPTY,
        Publisher: Guid.EMPTY,
    },
    BooksCount: 0,
    ErrorMessage: "",
};

export const BooksReducer = createReducer<BooksState>(
    initialStateOfBooksPage,

    //Load Book
    on(Actions.loadBookSuccess, (state, { Book }) => ({
        ...state,
        Book: {
            BGID: Book.bgid,
            BAuthorGID: Book.bAuthorGID,
            BPublisherGID: Book.bPublisherGID,
            BTitle: Book.bTitle,
            BISBN: Book.bisbn,
            BGenre: Book.bGenre,
            BLanguage: Book.bLanguage,
            BDescription: Book.bDescription,
        },
    })),
    
    on(Actions.loadBookError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Books
    on(Actions.loadBooksSuccess, (state, { Books }) => ({
        ...state,
        Books: Books.list,
        BooksCount: Books.count
    })),

    on(Actions.loadBooksError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Authors
    on(Actions.loadAuthorsSuccess, (state, { Authors }) => ({
        ...state,
        Authors: Authors.list,
    })),

    on(Actions.loadAuthorsError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Authors
    on(Actions.loadPublishersSuccess, (state, { Publishers }) => ({
        ...state,
        Publishers: Publishers.list,
    })),

    on(Actions.loadPublishersError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Save Book 
    on(Actions.addBookSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addBookError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Update Book 
    on(Actions.updateBookSuccess, (state) => ({
        ...state,
    })),
    
    on(Actions.updateBookError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Book
    on(Actions.deleteBookSuccess, (state, { bgid }) => {
        let newBooks = [...state.Books];

        let booksWithoutDeletedBook = newBooks.filter(x => x.bgid != bgid);

        return {...state, Books: booksWithoutDeletedBook};
    }),

    on(Actions.deleteBookError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Filters
    on(Actions.updatePaginationDataBooks, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.changeFilterGenreValue, (state, { value }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Genre: value as GenreEnum
        }
    })),

    on(Actions.changeFilterAuthorValue, (state, { value }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Author: value
        }
    })),

    on(Actions.changeFilterPublisherValue, (state, { value }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Publisher: value
        }
    })),


    on(Actions.cleanState, (state) => ({
        ...state,
        Books: [],
        Authors: [],
        Publishers: [],
        Book: {
            BGID: "",
            BAuthorGID: "",
            BPublisherGID: "",
            BTitle: "",
            BISBN: "",
            BGenre: GenreEnum.Fable,
            BLanguage: "",
            BDescription: "",
        },
        Filters: {
            Skip: 0,
            Take: 10,
            Genre: GenreEnum.All,
            Author: Guid.EMPTY,
            Publisher: Guid.EMPTY
        },
        BooksCount: 0,
        ErrorMessage: "",
    })),
) 
