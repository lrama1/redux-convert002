import {accounts, account} from "./account";

describe('reducers/account', ()=> {

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    afterEach(() => {
        jest.clearAllMocks();
    });

    /* We are testing that when we give our reducer an action, it creates
    * an expected new state*/
    it('returns a state with accounts', () => {
        const dummyAction = {
            type: 'ACCOUNTS_FETCH_SUCCESS',
            accounts: [

            ],
            totalRecords: 2
        }

        const expectedResults = {
            records: [],
            totalRecords: 2
        }

        const result = accounts(null, dummyAction);
        expect(result).toEqual(expectedResults)
    })

    it('returns a state with account', () => {
        const dummyAction = {
            type: 'ACCOUNT_FETCH_SUCCESS',
            account: {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                            }
        }

        const expectedResults = {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                        }

        const result = account(null, dummyAction);
        expect(result).toEqual(result)
    })

    it('returns a state a field edited', () => {
        const dummyAction = {
            type: 'ACCOUNT_EDIT',
            "accountId": 'ZZZ'
        }

        const expectedResults = {
            "accountId": "ZZZ",
            attr2: 'YYY'
        }

        const result = account({attr2: 'YYY'}, dummyAction);
        expect(result).toEqual(result)
    })

    it('returns saved account', () => {
        const dummyAction = {
            type: 'ACCOUNT_SAVE_SUCCESS',
            "account": {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                            }
        }

        const expectedResult = {
                                                accountId: 'SampleaccountId'
                                                                ,accountName: 'SampleaccountName'    
                                                                ,accountBalance: 'SampleaccountBalance'    
                                        }

        const result = account(null, dummyAction);

        expect(result).toEqual(expectedResult)
    })

    it('pops up alert on error', () => {
        const dummyAction = {
            type: 'ACCOUNT_SAVE_ERROR',
            error: 'Error saving'
        }

        const result = account(null, dummyAction);
        expect(window.alert).toBeCalledWith('Error saving')
    })
})