import {fetchAllAccounts} from '../actions/account'

import {connect} from "react-redux";
import App from '../App'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        accounts: state.accountsReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return{
        fetchAllAccounts: (url) => dispatch(fetchAllAccounts(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)