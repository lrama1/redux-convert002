import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { fetchAccounts, pageChanged, sorted } from "./accountsSlice";
import { fetchAccount } from "./accountSlice";
import { useHistory } from "react-router-dom";

function AccountList() {
  const dispatch = useDispatch();

  const {
    entities: accounts,
    perPage,
    first,
    totalRecords,
    page,
    sortField,
    sortOrder,
  } = useSelector((state) => state.accounts);

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  function onAccountsChangePage({ first, rows, page }) {
    dispatch(pageChanged({ first, rows, page }));
    dispatch(fetchAccounts());
  }

  function onSort({ sortField, sortOrder }) {
    dispatch(sorted({ sortField, sortOrder }));
    dispatch(fetchAccounts());
  }

  function buttonClicked(event) {
    const accountId = event.target.value;
    dispatch(fetchAccount("account/" + accountId));
    history.push({ pathname: "/account" });
  }

  function actionTemplate(rowData, column) {
    return (
      <Button
        id={rowData.accountId}
        value={rowData.accountId}
        onClick={buttonClicked}
      >
        Edit
      </Button>
    );
  }
  return (
    <DataTable
      className="p-datatable-products"
      first={first}
      paginator={true}
      value={accounts}
      lazy={true}
      rows={perPage}
      totalRecords={totalRecords}
      onPage={onAccountsChangePage}
      selectionMode="single"
      responsiveLayout="stack"
      breakpoint="960px"
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={onSort}
    >
      <Column field="accountId" header="ACCOUNTID" sortable />
      <Column field="accountName" header="ACCOUNTNAME" sortable />
      <Column field="accountBalance" header="ACCOUNTBALANCE" sortable />
      <Column body={actionTemplate} />
    </DataTable>
  );
}

export default AccountList;
