
import {connect} from 'react-redux';
import AccountList from '../components/AccountList'
import {fetchAccount, fetchAllAccounts, accountsChangePage, accountsSort, createNewAccount} from '../actions/account';


export const mapStateToProps = (state) => {
    console.log(state);
    return {
        accounts: state.accounts.records,
        totalRecords: state.accounts.totalRecords,
        first: state.accounts.first,
        sortSettings: state.accounts.sortSettings
    };
};

export const mapDispatchToProps = (dispatch) => {
    return{
        fetchAccount(url){
            dispatch(fetchAccount(url))
        },
        onAccountsChangePage({first, rows, page}){
            console.log('change page')
            dispatch(accountsChangePage(first, rows, page))
            dispatch(fetchAllAccounts())
        },
        onSort({sortField, sortOrder}){
            dispatch(accountsSort(sortField, sortOrder))
            dispatch(fetchAllAccounts())
        },
        createNewAccount(){
        	dispatch(createNewAccount())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);