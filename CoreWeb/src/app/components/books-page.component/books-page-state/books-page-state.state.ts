import { GenreEnum } from "../../../enums/GenreEnum";

export const featureKeyBooksState = 'books-page-state';

export interface BooksState {
    Books: any[],
    Book: {
        BGID: string
        BAuthorGID: string
        BPublisherGID: string
        BTitle: string
        BISBN: string
        BGenre: GenreEnum
        BLanguage: string
        BDescription: string
    },
    Filters: {
        Skip: number,
        Take: number,
    },
    BooksCount: number,
    ErrorMessage: string,
}