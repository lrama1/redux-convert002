
import React from 'react';
import AccountList from "../components/AccountList";
import {render, screen, fireEvent} from '@testing-library/react'

describe("AccountList", () => {
    const props = {
        history: []
    }

    const mockFetchAccount = jest.fn();
    const mockFetchAllAccounts = jest.fn();
    const mockOnChangePage = jest.fn();
    const mockOnSort = jest.fn();
    const mockAccounts =
        [
                                                                                                                                                                                           
          {accountId: 'Sample-accountId0',accountName: 'Sample-accountName0',accountBalance: 'Sample-accountBalance0'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId1',accountName: 'Sample-accountName1',accountBalance: 'Sample-accountBalance1'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId2',accountName: 'Sample-accountName2',accountBalance: 'Sample-accountBalance2'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId3',accountName: 'Sample-accountName3',accountBalance: 'Sample-accountBalance3'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId4',accountName: 'Sample-accountName4',accountBalance: 'Sample-accountBalance4'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId5',accountName: 'Sample-accountName5',accountBalance: 'Sample-accountBalance5'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId6',accountName: 'Sample-accountName6',accountBalance: 'Sample-accountBalance6'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId7',accountName: 'Sample-accountName7',accountBalance: 'Sample-accountBalance7'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId8',accountName: 'Sample-accountName8',accountBalance: 'Sample-accountBalance8'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId9',accountName: 'Sample-accountName9',accountBalance: 'Sample-accountBalance9'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId10',accountName: 'Sample-accountName10',accountBalance: 'Sample-accountBalance10'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId11',accountName: 'Sample-accountName11',accountBalance: 'Sample-accountBalance11'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId12',accountName: 'Sample-accountName12',accountBalance: 'Sample-accountBalance12'}
                                ,
                                                                                                                                                                                   
          {accountId: 'Sample-accountId13',accountName: 'Sample-accountName13',accountBalance: 'Sample-accountBalance13'}
                ]

        const componentToTest = <AccountList history={props.history} fetchAccount={mockFetchAccount}
            fetchAllAccounts={mockFetchAllAccounts} accounts={mockAccounts} first={0} totalRecords={11} 
            onAccountsChangePage={mockOnChangePage} onSort={mockOnSort} sortSettings={{}}/>
        
        it('renders correctly', () => {            
            expect(componentToTest).toMatchSnapshot();
        })
        
        it('displays the correct number of rows', () => {
        	const {container} = render(componentToTest);
            const numberOfRowsRendered = container.querySelectorAll('div.p-datatable-wrapper > table > tbody > tr').length;
            expect(numberOfRowsRendered).toBe(10);
        })

        it('invokes row action', () =>{
            const {container} = render(componentToTest);
            fireEvent.click(container.querySelector("button[id='Sample-accountId0']"));
            expect(mockFetchAccount).toBeCalledTimes(1);
        })
        
        it('invokes next page', () => {
        	const {container} = render(componentToTest);
            const selector = "button.p-paginator-next.p-paginator-element.p-link";
        	fireEvent.click(container.querySelector(selector));
            expect(mockOnChangePage).toBeCalledTimes(1);
        })
})