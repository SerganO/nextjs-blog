import { PAGE_SET_FILTER, PAGE_FETCHING, PAGE_CLEAR } from "store/actionTypes";
const initialPagerState: any = {};

export function pagination(state = initialPagerState, action: any) {
  // get result for the paginator, disable fetching
  if (action?.payload?.data?.result && action.payload.pager) {
    const pager = action.payload.pager;
    const result = action.payload.data.result;
    if (pager.pageName) {
      const pageName = pager.pageName;

      let pagination = state[pageName] ? state[pageName] : {};
      let pages = pagination["pages"] ? pagination["pages"] : {};
      let item = null;
      if (result?.length === 0) {
        pager.page = pages.size;
      } else {
        item = {
          ids: result,
        };
      }

      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          ...pagination,
          entityName: pager.entityName,
          pageName: pageName,
          currentPage: pager.page,
          count: pager.count,
          perPage: pager.perPage,
          pages: {
            ...pages,
            [pager.page]: item,
          },
        },
      };
    }
  }
  // prepare item for the paginator, enable fetching
  const { type } = action;
  switch (type) {
    case PAGE_FETCHING: {
      const { pageName, page, isFetching } = action;
      let pagination = state[pageName] ? state[pageName] : {};
      let currentPage = pagination["currentPage"];

      if (pagination["pages"] && pagination["pages"][page]) {
        //to avoid empty page before loading new page data

        currentPage = page;
      }
      const newState = {
        ...state,
        [pageName]: {
          ...state[pageName],
          ...pagination,
          currentPage,
          fetching: isFetching,
        },
      };
      return newState;
    }
    case PAGE_SET_FILTER: {
      const { pageName, filter, sort } = action;
      let pagination = state[pageName] ? state[pageName] : {};
      const newState = {
        ...state,
        [pageName]: {
          ...state[pageName],
          ...pagination,
          filter: filter,
          sort: sort,
        },
      };
      return newState;
    }

    case PAGE_CLEAR: {
      const { pageName } = action;
      const newState = {
        ...state,
        [pageName]: {
          ...state[pageName],
          pages: {},
        },
      };
      return newState;
    }
  }

  return state;
}
