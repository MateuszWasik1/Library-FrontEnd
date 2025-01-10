export const featureKeyPublishersState = 'publishers-page-state';

export interface PublishersState {
    Publishers: any[],
    Publisher: {
        PGID: string,
        PName: string,
        PCountry: string,
        PCity: string,
        PEmail: string,
        PPhone: string,
    },
    Filters: {
        Skip: number,
        Take: number,
    },
    PublishersCount: number,
    ErrorMessage: string,
}