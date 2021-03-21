import Login_Reducer from './Login_Reducers';
import SignUp_Reducers from './SignUp_Reducers';
import Default_Reducers from './Default_Reducers';
import Doctors_Reducers from './Doctors_Reducers';
import User_Reducers from './User_Reducers';
import Services_Reducers from './Services_Reducers';
import Diagnostic_Reducers from './Diagnostic_Reducers';
import News_Reducers from './News_Reducers';
import Events_Reducers from './Events_Reducers';
import {combineReducers} from 'redux';

const Root_Reducer = combineReducers({
  Login_Reducer: Login_Reducer,
  SignUp_Reducers: SignUp_Reducers,
  Default_Reducers: Default_Reducers,
  Doctors_Reducers: Doctors_Reducers,
  Services_Reducers: Services_Reducers,
  User_Reducers: User_Reducers,
  Diagnostic_Reducers: Diagnostic_Reducers,
  News_Reducers: News_Reducers,
  Events_Reducers: Events_Reducers,
});
export default Root_Reducer;
