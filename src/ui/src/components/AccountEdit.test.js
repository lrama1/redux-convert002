import React from 'react';
import AccountEdit from './AccountEdit';
import {render, fireEvent} from '@testing-library/react'

describe("AccountEdit", ()=> {
    const mockChangeHandler = jest.fn();
    const mockSaveHandler = jest.fn();

    const mockSelectedAccount = {
                        accountId: 'SampleaccountId'
                                ,accountName: 'SampleaccountName'    
                                ,accountBalance: 'SampleaccountBalance'    
                    }

    const componentToTest = <AccountEdit selectedAccount={mockSelectedAccount} onEditAccount={mockChangeHandler}
                        onSaveAccount={mockSaveHandler}/>    
    
    it('Renders fields correctly', () =>{        
        expect(componentToTest).toMatchSnapshot();
    });
        
    it('dispatches input changes', ()=> {
        const {container} = render(componentToTest)
        fireEvent.change(container.querySelector("input[name='accountId'"), {target: {value: 'TEST'}})
        expect(mockChangeHandler).toBeCalledTimes(1);
    })
    
    it('calls save function on click of Save button', () => {
        const {container} = render(componentToTest)
        fireEvent.click(container.querySelector("button[id='saveButton']"))
        expect(mockSaveHandler).toBeCalledTimes(1);
        expect(mockSaveHandler).toHaveBeenCalledWith('account/SampleaccountId', mockSelectedAccount)
    })

})