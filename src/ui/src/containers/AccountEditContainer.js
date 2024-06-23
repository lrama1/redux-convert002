import {connect} from 'react-redux';
import {editAccount, saveAccount} from '../actions/account';
import AccountEdit from '../components/AccountEdit';

export const mapStateToProps = (state) => {
    console.log(state);
    return {
        selectedAccount: state.account
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onEditAccount(event){
            const {name, value} = event.target;
            dispatch(editAccount(name, value))
        },
        onSaveAccount(url, account){
            dispatch(saveAccount(url, account))
        }
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(AccountEdit);