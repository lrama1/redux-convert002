//DomainDetail-template.js
import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { Calendar } from 'primereact/calendar';


function AccountEdit({selectedAccount, onEditAccount, onSaveAccount}){

    function buttonEventHandler(event){
        onSaveAccount('account/' + selectedAccount.accountId,
        		selectedAccount);
        event.preventDefault();
    }

    return(
      <div className="p-grid">
          <form>
                        <div className="p-col-4">
		      <label htmlFor="accountId">accountId</label>
		      		      <InputText id="accountId" name="accountId" value={selectedAccount.accountId}
		          onChange={onEditAccount}/>
              		      </div>
		                <div className="p-col-4">
		      <label htmlFor="accountName">accountName</label>
		      		      <InputText id="accountName" name="accountName" value={selectedAccount.accountName}
		          onChange={onEditAccount}/>
              		      </div>
		                <div className="p-col-4">
		      <label htmlFor="accountBalance">accountBalance</label>
		      		      <InputText id="accountBalance" name="accountBalance" value={selectedAccount.accountBalance}
		          onChange={onEditAccount}/>
              		      </div>
		    		    
            <Button id="saveButton" onClick={buttonEventHandler}>Save</Button>
          </form>
      </div>
    );
}

export default AccountEdit;