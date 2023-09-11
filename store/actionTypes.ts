import { Action } from "redux";

export function action(type: string, payload = {}): Action {
  return { type, ...payload };
}

export function pageFetching(pageName, page, isFetching, force = false) {
  return action(PAGE_FETCHING, {pageName, page, isFetching, force})
}

export function pageSetFilter(pageName, filter, sort) {
  return action(PAGE_SET_FILTER, {pageName, filter, sort})
}


export const PAGE_FETCHING = "PAGE_FETCHING"
export const PAGE_SET_FILTER = "PAGE_SET_FILTER"


export const SELECT_PRODUCT_ID = "SELECT_PRODUCT_ID";

export const ERROR = "ERROR"

export const PRODUCT_REQUESTED = "PRODUCT_REQUESTED";
export const PRODUCT_FETCH_SUCCEEDED = "PRODUCT_FETCH_SUCCEEDED";
export const PRODUCT_FETCH_FAILED = "PRODUCT_FETCH_FAILED";

export const ADD_FEEDBACK_TO_PRODUCT_REQUESTED = "ADD_FEEDBACK_TO_PRODUCT_REQUESTED"
export const ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED = "ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED"
export const ADD_FEEDBACK_TO_PRODUCT_FAILED = "ADD_FEEDBACK_TO_PRODUCT_FAILED"


export const SELECT_PAGE = "SELECT_PAGE";

export const PRODUCT_PAGE_REQUESTED = "PRODUCT_PAGE_REQUESTED";
export const PRODUCT_PAGE_FETCH_SUCCEEDED = "PRODUCT_PAGE_FETCH_SUCCEEDED";
export const PRODUCT_PAGE_FETCH_FAILED = "PRODUCT_PAGE_FETCH_FAILED";


export const SELECT_USER = "SELECT_USER";

export const USER_REQUESTED = "USER_REQUESTED";
export const USER_FETCH_SUCCEEDED = "USER_FETCH_SUCCEEDED";
export const USER_FETCH_FAILED = "USER_FETCH_FAILED";


export const MAIN_PRODUCT_PAGE_REQUESTED = "MAIN_PRODUCT_PAGE_REQUESTED";
export const MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED = "MAIN_PRODUCT_PAGE_FETCH_SUCCEEDED";
export const MAIN_PRODUCT_PAGE_FETCH_FAILED = "MAIN_PRODUCT_PAGE_FETCH_FAILED";


export const ADD = "ADD"
export const UPDATE = "UPDATE"
export const GET = "GET"
export const DELETE = "DELETE"

export const UPDATE_VALUE = "UPDATE_VALUE"







export const ADD_FEEDBACK = "ADD_FEEDBACK";
export const REMOVE_FEEDBACK = "REMOVE_FEEDBACK";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
