export const featureKeyReportsState = 'reports-page-state';

export interface ReportsState {
    Reports: any[],
    Filters: {
        Skip: number,
        Take: number,
    },
    ReportsCount: number,
}