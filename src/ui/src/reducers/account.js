import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_EDIT,
  ACCOUNT_SAVE_SUCCESS,
  ACCOUNT_SAVE_ERROR,
  ACCOUNT_CREATE_NEW,
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_CHANGE_PAGE,
  ACCOUNTS_SORT,
} from "../actions/account";
import _ from "lodash";

const initialAccounts = {
  records: [],
  totalRecords: 0,
  first: 0,
  rowsPerPage: 10,
  pageNumber: 0,
  sortSettings: {
    sortField: "",
    sortOrder: "",
  },
};

export const accounts = (state = initialAccounts, action) => {
  if (action.type === "ACCOUNTS_FETCH_SUCCESS") {
    return {
      ...state,
      records: action.accounts,
      totalRecords: action.totalRecords,
    };
  } else if (action.type === ACCOUNTS_CHANGE_PAGE) {
    return {
      ...state,
      rowsPerPage: action.rowsPerPage,
      pageNumber: action.pageNumber,
      first: action.first,
    };
  } else if (action.type === ACCOUNTS_SORT) {
    return {
      ...state,
      sortSettings: {
        sortField: action.sortField,
        sortOrder: action.sortOrder,
      },
    };
  }
  return state;
};

const initialAccount = {
  accountId: "",

  accountName: "",
  accountBalance: "",
};

export const account = (state = initialAccount, action) => {
  if (action.type === ACCOUNT_FETCH_SUCCESS) {
    return {
      ...state,
      ...action.account,
    };
  } else if (action.type === ACCOUNT_EDIT) {
    /*return {
        	...state,
        	[action.name]: action.value
        	}*/
    const newState = _.set(state, action.name, action.value);
    return { ...newState };
  } else if (action.type === ACCOUNT_SAVE_SUCCESS) {
    return {
      ...state,
      ...action.account,
    };
  } else if (action.type === ACCOUNT_SAVE_ERROR) {
    alert(action.error);
    return state;
  } else if (action.type === ACCOUNT_CREATE_NEW) {
    return {
      ...initialAccount,
    };
  }
  return state;
};
