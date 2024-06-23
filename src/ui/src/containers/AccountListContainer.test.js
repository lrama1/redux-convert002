
import React from 'react';
jest.mock('../actions/account')
import {fetchAccount, ACCOUNTS_CHANGE_PAGE, accountsChangePage} from '../actions/account';
import {mapStateToProps, mapDispatchToProps} from "./AccountListContainer";

describe('AccountListContainer', () => {
    const mockDispatch = jest.fn();
    
    afterEach(() => {
        mockDispatch.mockClear();
    });
    
    it('returns the expected state', ()=> {
        const sampleState = {
            accounts: {
                records: [],
                totalRecords: 0,
                first: 1
            }
        }
        const result = mapStateToProps(sampleState);
        expect(result).toMatchSnapshot();
    })
    
    it('dispatches fetchAccount', () => {
        fetchAccount.mockImplementation(()=> {
            return {param: 'SomeValue'}
        });
        
        mapDispatchToProps(mockDispatch).fetchAccount('mockurl', 1)
        expect(mockDispatch).toBeCalledWith({param:'SomeValue'})
    })
    
    it('invokes changePage action', ()=> {
        accountsChangePage.mockImplementation(() => {
            return{
                type: ACCOUNTS_CHANGE_PAGE,
                first: 0,
                rowsPerPage: 10,
                pageNumber: 1
            }
        })

        mapDispatchToProps(mockDispatch).onAccountsChangePage({first:0, rows: 10, page:1})
        expect(mockDispatch).toBeCalledWith({type: ACCOUNTS_CHANGE_PAGE,  first: 0, pageNumber: 1, rowsPerPage: 10})
    })
});