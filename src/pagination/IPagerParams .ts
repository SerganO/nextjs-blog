export interface IPagerParams {
    pageName?: string;  // paginator name
    sort?: object;      // object with sorting key/values
    filter?: object;    // object with filtering key/values
    page?: number;       // page number
    perPage: number;    // count items on one page
    force?: boolean;    // reload data in the redux and pager
    count?: number;     // count by filter, if 0 need to recalculate, if > 0 count doesn't need to calculate
    entityName?: string;
}