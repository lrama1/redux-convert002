/*
Refactor opportunities
1.  create separate files for each logical group of action creators
2.  combine the separate action creator files here an export them
 */
import {getRequest, putRequest, postRequest} from "../utils/authority";

export const ACCOUNT_FETCH_SUCCESS = 'ACCOUNT_FETCH_SUCCESS';
export function accountFetchSuccess(account){
    console.log('DISPATCHING SUCCESS', account );
    return {
        type: ACCOUNT_FETCH_SUCCESS,
        account: account
    }
}

export const ACCOUNT_FETCH_ERROR = 'ACCOUNT_FETCH_ERROR';
export function accountFetchError(error){
    return {
        type: ACCOUNT_FETCH_ERROR,
        error: error
    }
}

export function fetchAccount(url){
    console.log('Fetch of single account Invoked');
    return async dispatch => {
        try{
            const data = await getRequest(url);
            dispatch(accountFetchSuccess(data))
        }catch (e) {
            dispatch(accountFetchError(true))
        }   
    }
}

export const ACCOUNT_EDIT = 'ACCOUNT_EDIT';
export function editAccount(name, value){    
    return {
        type: ACCOUNT_EDIT,
        name,
        value
    }
}

export const ACCOUNT_SAVE_SUCCESS = 'ACCOUNT_SAVE_SUCCESS';
export function saveAccountSuccess(account){
    return {
        type: ACCOUNT_SAVE_SUCCESS,
        account: account
    }
}

export const ACCOUNT_SAVE_ERROR = 'ACCOUNT_SAVE_ERROR';
export function saveAccountError(error){
    return {
        type: ACCOUNT_SAVE_ERROR,
        error
    }
}

export function saveAccount(url, account){
    return async dispatch => {
        try {
            //const data = await putRequest(url, account)
        	const data = account.accountId === ''? await postRequest(url, account):
        		await putRequest(url, account)
            dispatch(saveAccountSuccess(data))
        }catch (e){
            alert(JSON.stringify(e))
        }
    }
}

export const ACCOUNT_CREATE_NEW = 'ACCOUNT_CREATE_NEW'
export function createNewAccount(){
    return {
        type: ACCOUNT_CREATE_NEW
    }
}

/*---------------------------------------------------------*/

export const ACCOUNTS_FETCH_SUCCESS = 'ACCOUNTS_FETCH_SUCCESS';
export function accountsFetchSuccess(accounts, totalRecords, lastPage){
    console.log('DISPATCHING SUCCESS', accounts );
    return {
        type: ACCOUNTS_FETCH_SUCCESS,
        accounts: accounts,
        totalRecords,
        lastPage
    }
}

export const ACCOUNTS_FETCH_ERROR = 'ACCOUNTS_FETCH_ERROR';
export function accountsFetchError(error){
    return {
        type: ACCOUNTS_FETCH_ERROR,
        error: error
    }
}

const ACCOUNTS_URI = 'accounts'
export function fetchAllAccounts(){
    console.log('Fetch Invoked');
    return async (dispatch, getState) => {
        const {first, rowsPerPage, pageNumber, sortSettings} = getState().accounts
        try {
            const data = await getRequest(ACCOUNTS_URI + '?page=' + (pageNumber + 1) + '&per_page=' + rowsPerPage +
                    '&sort_by=' + sortSettings.sortField + '&order=' + sortSettings.sortOrder);
            dispatch(accountsFetchSuccess(data.rows, data.totalRecords, data.lastPage))
        }catch (e) {
            dispatch(accountsFetchError(e))
        }
    }
}

export const ACCOUNTS_CHANGE_PAGE = 'ACCOUNTS_CHANGE_PAGE'
	export function accountsChangePage(first, rowsPerPage, pageNumber){
	  return {
	      type: ACCOUNTS_CHANGE_PAGE,
	      first,
	      rowsPerPage,
	      pageNumber
	
	  }
	}
    
export const ACCOUNTS_SORT = 'ACCOUNTS_SORT'
export function accountsSort(sortField, sortOrder){
    return{
        type: ACCOUNTS_SORT,
        sortField,
        sortOrder
    }
}    