import { PAGE_SET_FILTER, PAGE_FETCHING } from "store/actionTypes";
const initialPagerState: any = {};

type IPagination = {};

type IPaginationPage = {};

export function pagination(state = initialPagerState, action: any) {
  // get result for the paginator, disable fetching
  console.log("pagination resucer: ", action);
  if (action?.payload?.data?.result && action.payload.data.result.pager) {
    console.log("in pager func");
    const pager = action.payload.data.result.pager;
    const result = action.payload.data.result.data.items;
    if (/*'glob' in action && */ pager.pageName) {
      const pageName = pager.pageName;

      let pagination = state[pageName] ? state[pageName] : {};
      let pages = pagination["pages"] ? pagination["pages"] : {};
      let item = null
      if (result?.length === 0) {
        pager.page = pages.size;
      } else {
        item = {
          ids: result,
        };

        //pages[pager.page] = item;
      }

      //Extra return
      console.log("return pager state");
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
            [pager.page]: item
          },
        },
      };
      //state = state.set(pageName, pagination);
    }
  }
  // prepare item for the paginator, enable fetching
  const { type } = action;
  switch (type) {
    case "MODEL_CLEAR":
      state = initialPagerState;
      break;
    case PAGE_FETCHING:
      {
        const { pageName, page, isFetching, force } = action;
        let pagination = state[pageName] ? state[pageName] : {};
        //pagination = pagination.set('fetching', isFetching);
        let currentPage = pagination["currentPage"];
        if (pagination["pages"] && pagination["pages"][page]) {
          //to avoid empty page before loading new page data
          //if (pagination.hasIn(['pages', page])) { //to avoid empty page before loading new page data
          //pagination["currentPage"] = page
          currentPage = page;
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
          },
        };
        return newState; /* {
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

    case "PAGE_SELECT_ITEM":
      {
        const { pageName, selectedItems } = action;
        let pagination = state[pageName] ? state[pageName] : {};
        pagination["touched"] = selectedItems;
        //pagination = pagination.set('touched', selectedItems);
        const newState = {
          ...state,
          [pageName]: {
            ...state[pageName],
            ...pagination,
          },
        };
        return newState; /* {
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

    case PAGE_SET_FILTER:
      {
        const { pageName, filter, sort } = action;
        let pagination = state[pageName] ? state[pageName] : {};
        //pagination["filter"] = filter
        //pagination["sort"] = sort
        const newState = {
          ...state,
          [pageName]: {
            ...state[pageName],
            ...pagination,
            filter: filter,
            sort: sort,
          },
        };
        return newState; /* {
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
