
import {getRequest, putRequest} from "../utils/authority";
import {
    ACCOUNT_FETCH_SUCCESS,
    ACCOUNT_SAVE_SUCCESS,
    ACCOUNTS_FETCH_SUCCESS,
    ACCOUNT_SAVE_ERROR,
    ACCOUNTS_FETCH_ERROR,
    ACCOUNT_FETCH_ERROR,
    fetchAllAccounts,
    fetchAccount,
    saveAccount
} from "./account";

jest.mock('../utils/authority')

describe('account (action)', () => {
    
    const mockDispatch = jest.fn();
    const mockGetState= () => {
        return {
            accounts: {
            	records: [],
                sortSettings: {}
            }
        }
    }

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('invokes success when list of accounts are returned', async () => {
        /* obtain reference to thunk*/
        const thunk = fetchAllAccounts('/mockurl', 1);

        /**/
        const response = Promise.resolve({rows:[], totalRecords: 0})
        getRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith({type: ACCOUNTS_FETCH_SUCCESS, accounts: [], totalRecords: 0})
    })

    it('invokes error when an error occured in the service', async () => {
        /* obtain reference to thunk*/
        const thunk = fetchAllAccounts('/mockurl', 1);

        /**/
        const response = Promise.reject('Error Occured')
        getRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith({type: ACCOUNTS_FETCH_ERROR, error: 'Error Occured'})
    })
    
    it('invokes success when a single account is returned', async () => {
        /* obtain reference to thunk*/
        const thunk = fetchAccount('/mockurl');

        /**/
        const mockObjectToReturn = {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                            }
        
        const response = Promise.resolve(mockObjectToReturn)
        getRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith({type: ACCOUNT_FETCH_SUCCESS, account: mockObjectToReturn})
    })
    
    it('invokes error when a single account fetch returned error', async () => {
        /* obtain reference to thunk*/
        const thunk = fetchAccount('/mockurl');
        
        const response = Promise.reject()
        getRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith({type: ACCOUNT_FETCH_ERROR, error: true})
    })

    it('invokes success when a record is saved', async () => {
        /* obtain reference to thunk*/
        const thunk = saveAccount('/mockurl', {});

        /**/
        const mockObjectToReturn = {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                            }
        const response = Promise.resolve(mockObjectToReturn)
        putRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(mockDispatch).toBeCalledWith({type: ACCOUNT_SAVE_SUCCESS, account: mockObjectToReturn})
    })
    
    it('invokes error when save errors out', async () => {
        /* obtain reference to thunk*/
        const thunk = saveAccount('/mockurl', {});

        const response = Promise.reject('Error saving')
        putRequest.mockImplementation(() => response);

        const result = await thunk(mockDispatch, mockGetState);
        expect(window.alert).toBeCalledWith("\"Error saving\"")
    })

})