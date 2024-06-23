import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { edited, saveAccount } from "./accountSlice";

function AccountEdit() {
  const dispatch = useDispatch();

  const selectedAccount = useSelector((state) => state.account.entity);

  function buttonEventHandler(event) {
    dispatch(saveAccount(selectedAccount));
    event.preventDefault();
  }

  function onEditAccount(event) {
    const { name, value } = event.target;
    dispatch(edited({ name, value }));
  }

  return (
    <div className="p-grid">
      <form>
        <div className="p-col-4">
          <label htmlFor="accountId">accountId</label>
          <InputText
            id="accountId"
            name="accountId"
            value={selectedAccount.accountId}
            onChange={onEditAccount}
          />
        </div>
        <div className="p-col-4">
          <label htmlFor="accountName">accountName</label>
          <InputText
            id="accountName"
            name="accountName"
            value={selectedAccount.accountName}
            onChange={onEditAccount}
          />
        </div>
        <div className="p-col-4">
          <label htmlFor="accountBalance">accountBalance</label>
          <InputText
            id="accountBalance"
            name="accountBalance"
            value={selectedAccount.accountBalance}
            onChange={onEditAccount}
          />
        </div>

        <Button id="saveButton" onClick={buttonEventHandler}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default AccountEdit;
