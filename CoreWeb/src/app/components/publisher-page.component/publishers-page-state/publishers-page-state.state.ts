export const featureKeyPublishersState = 'publishers-page-state';

export interface PublishersState {
    Publishers: any[],
    Publisher: {
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
    PublishersCount: number,
    ErrorMessage: string,
}