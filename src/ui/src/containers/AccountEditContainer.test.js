jest.mock('../actions/account')
import {mapStateToProps, mapDispatchToProps} from "./AccountEditContainer";
import {saveAccount, editAccount, ACCOUNT_EDIT, ACCOUNT_SAVE_SUCCESS} from "../actions/account";


describe('AccountEditContainer', () => {

    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();

    afterEach(() => {
        mockDispatch.mockClear();
    });

    it('returns the expected state', ()=> {
        const sampleState = {
            account: {
                field1: 'samplevalue1',
                field2: 'samplevalue2'

            }
        }
        const result = mapStateToProps(sampleState);
        expect(result).toEqual(
            {
                selectedAccount: {
                    field1: 'samplevalue1',
                    field2: 'samplevalue2'
                }
            }
        )
    })

    it('invokes edit account action', ()=> {
        editAccount.mockImplementation(()=> {
            return{
                type: ACCOUNT_EDIT,
                name: 'field1',
                value: 'dummyval'
            }
        })
        mapDispatchToProps(mockDispatch).onEditAccount({target: {name: 'field1', value: 'dummyval'}})
        expect(mockDispatch).toBeCalledWith({
            type: ACCOUNT_EDIT,
            name: 'field1',
            value: 'dummyval'
        })
        expect(mockDispatch).toBeCalledTimes(1)
    })

    it('invokes save account action', ()=> {
        saveAccount.mockImplementation(()=>{
            return {
                type: ACCOUNT_SAVE_SUCCESS
            }
        })

        mapDispatchToProps(mockDispatch).onSaveAccount('/save', {})
        expect(mockDispatch).toBeCalledWith({type: ACCOUNT_SAVE_SUCCESS})
    })

});