import { createReducer, on } from "@ngrx/store";
import * as Actions from "./publishers-page-state.actions"
import { PublishersState } from "./publishers-page-state.state";

var initialStateOfPublishersPage: PublishersState = {
    Publishers: [],
    Publisher: {
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
    PublishersCount: 0,
    ErrorMessage: "",
};

export const PublishersReducer = createReducer<PublishersState>(
    initialStateOfPublishersPage,

    //Load Publisher
    on(Actions.loadPublisherSuccess, (state, { Publisher }) => ({
        ...state,
        Publisher: {
            AGID: Publisher.agid,
            AFirstName: Publisher.aFirstName,
            AMiddleName: Publisher.aMiddleName,
            ALastName: Publisher.aLastName,
            ANickName: Publisher.aNickName,
            ANationality: Publisher.aNationality
        },
    })),
    
    on(Actions.loadPublisherError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Publishers
    on(Actions.loadPublishersSuccess, (state, { Publishers }) => ({
        ...state,
        Publishers: Publishers.list,
        PublishersCount: Publishers.count
    })),

    on(Actions.loadPublishersError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Save Publisher 
    on(Actions.addPublisherSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addPublisherError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Update Publisher 
    on(Actions.updatePublisherSuccess, (state) => ({
        ...state,
    })),
    
    on(Actions.updatePublisherError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Publisher
    on(Actions.deletePublisherSuccess, (state, { pgid }) => {
        let newPublishers = [...state.Publishers];

        let publishersWithoutDeletedPublisher = newPublishers.filter(x => x.pgid != pgid);

        return {...state, Publishers: publishersWithoutDeletedPublisher};
    }),

    on(Actions.deletePublisherError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Filters
    on(Actions.updatePaginationDataPublishers, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        Publishers: [],
        Publisher: {
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
        PublishersCount: 0,
        ErrorMessage: "",
    })),
) 