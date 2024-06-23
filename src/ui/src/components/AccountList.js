import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function AccountList({
  history,
  fetchAccount,
  fetchAllAccounts,
  accounts,
  first,
  totalRecords,
  onAccountsChangePage,
  sortSettings,
  onSort,
  createNewAccount,
}) {
  /*function pageAction({first,rows, page}){
        console.log(first)
        fetchAllAccounts('accounts?per_page=' + rows + '&page=' + (page+1), first )
    }*/

  function buttonClicked(event) {
    fetchAccount("account/" + event.target.value);
    //tell route to display the Edit screen
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

  function dateBody(rowData, { field }) {
    const date = new Date(Date.parse(rowData[field]));
    return <>{date.toDateString()}</>;
  }

  function addNewRecord() {
    createNewAccount();
    history.push({ pathname: "/account" });
  }

  /*
    render a table component
     */
  return (
    <div className="layout-dashboard">
      <div>
        <Button onClick={addNewRecord}>Add New</Button>
      </div>
      <DataTable
        className="p-datatable-products"
        first={first}
        paginator={true}
        value={accounts}
        lazy={true}
        rows={10}
        totalRecords={totalRecords}
        onPage={onAccountsChangePage}
        selectionMode="single"
        responsiveLayout="stack"
        breakpoint="960px"
        sortField={sortSettings.sortField}
        sortOrder={sortSettings.sortOrder}
        onSort={onSort}
      >
        <Column field="accountId" header="ACCOUNTID" sortable />
        <Column field="accountName" header="ACCOUNTNAME" sortable />
        <Column field="accountBalance" header="ACCOUNTBALANCE" sortable />
        <Column body={actionTemplate} />
      </DataTable>
    </div>
  );
}

export default AccountList;
