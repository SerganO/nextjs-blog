
import { PAGE_SET_FILTER, PAGE_FETCHING } from "store/actionTypes";
const initialPagerState: any = {};

type IPagination = {

}

type IPaginationPage = {

}

export function pagination(state = initialPagerState, action: any) {
    // get result for the paginator, disable fetching
    if (action?.payload?.data?.result && action.payload.data.result.pager) {
        const pager = action.payload.data.result.pager
        const result = pager.items
        //const { response: { pager, result } } = action;
        if (/*'glob' in action && */pager.pageName) {
            const pageName = pager.pageName;

            let pagination = state[pageName] ? state[pageName] : {}
            //let pages = pagination.has('pages') ? pagination.get('pages') : new Map<number, IPaginationPage>();
            let pages = pagination['pages'] ? pagination['pages'] : {}
            if(result?.length === 0){
                pager.page = pages.size;
            }else {
                const item = {
                    ids: result//action.response.result,
                };


                pages[pager.page] = item

                //pages = pages.set(pager.page, item);
            }
            const oldTouched = pagination &&  pagination['touched']? pagination['touched'] : [];
            //const oldTouched = pagination?.get('touched');
            const touched = oldTouched? oldTouched : [];

            /*pagination["entityName"] = action.glob.entity.entityName
            pagination["pageName"] = pageName
            pagination["currentPage"] =  pager.page
            pagination["count"] =  pager.count
            pagination["perPage"] =  action.data.perPage
            pagination["touched"] = touched
            pagination["pages"] = pages*/

            /*pagination = pagination
                .set('entityName', action.glob.entity.entityName)
                .set('pageName', pageName)
                .set('currentPage', pager.page)
                .set('count', pager.count)
                .set('perPage', action.data.perPage)
                .set('touched', touched)
                .set('pages', pages);*/

                //Extra return
                return {
                    ...state,
                    [pageName]: {
                        ...state[pageName],
                        ...pagination,
                        entityName: pager.entityName,
                        pageName: pageName,
                        currentPage :  pager.page,
                        count :  pager.count,
                        perPage: pager.perPage,
                        touched : touched,
                        pages : pages,
                    }
                }
                //state = state.set(pageName, pagination);
        }
    }
    // prepare item for the paginator, enable fetching
    const { type } = action;
    switch (type) {
    case "MODEL_CLEAR":
        state = initialPagerState;
        break;
    case PAGE_FETCHING: {
        const { pageName, page, isFetching, force } = action;
        let pagination = state[pageName] ? state[pageName] : {}
        //pagination = pagination.set('fetching', isFetching);
        let currentPage = pagination["currentPage"]
        if (pagination["pages"] && pagination["pages"][page]) { //to avoid empty page before loading new page data
        //if (pagination.hasIn(['pages', page])) { //to avoid empty page before loading new page data
            //pagination["currentPage"] = page
            currentPage = page
            //pagination = pagination.set('currentPage', page);

            // if (force) {
            //     const pages = pagination.get('pages')?.filter((v, k) => Number.parseInt(k) < page);
            //     pagination = pagination.set('pages', pages);
            // }
        }
        const newState = {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
                currentPage,
                fetching: isFetching,
            }
        }
        return newState/* {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
                filter: filter,
                sort: sort,
            }
        }*/
        //state = state.set(pageName, pagination);
    }
        break;

    case "PAGE_SELECT_ITEM": {
        const { pageName, selectedItems } = action;
        let pagination = state[pageName] ? state[pageName] : {}
        pagination['touched'] = selectedItems;
        //pagination = pagination.set('touched', selectedItems);
        const newState = {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
            }
        }
        return newState/* {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
                filter: filter,
                sort: sort,
            }
        }*/
        //state = state.set(pageName, pagination);
    }
        break;

    case PAGE_SET_FILTER: {
        const { pageName, filter, sort } = action;
        let pagination = state[pageName] ? state[pageName] : {}
        //pagination["filter"] = filter
        //pagination["sort"] = sort
        const newState = {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
                filter: filter,
                sort: sort,
            }
        }
        return newState/* {
            ...state,
            [pageName]: {
                ...state[pageName],
                ...pagination,
                filter: filter,
                sort: sort,
            }
        }*/
        //state = state.set(pageName, pagination);
    }
        break;

    case "PAGE_CLEAR":
        {
            const { pageName } = action;
            // const pagination = state.has(pageName) ? state.get(pageName) : Map<string, IPagination>();

            // state = state.set(pageName, pagination);
        }
        break;
    }

    return state;
}
