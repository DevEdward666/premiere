import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUpScreen';
import Otp from '../Screens/OTPScreen';
import tac from '../Screens/TermsAndConditions';
import DoctorInfo from '../Screens/DoctorsInfoScreen';
import MyProfile from '../Screens/MeInfoScreen';
import Index from '../Screens/BottomNavigation';
import QRScreen from '../Screens/MyQRCodeScreen';
import SafeDavaoQR from '../Screens/SafeDavaoQR';
import UIApps from '../Screens/UIApps';
import Diagnostic from '../Screens/UIDiagnostics';
import DiagnosticRequest from '../Screens/UIDiagnosticsRequestList';
import MainDiagnosticsUI from '../Screens/UIMainDiagnostics';
import DiagnosticsResults from '../Screens/UIDiagnoticsResults';
import DiagnosticsResultsList from '../Screens/UIDiagnosticsResultsList';
import NewsInfo from '../Screens/UINewsInfo';
import CalendarEvents from '../Screens/UICalendar';

import LinkMedicalRecords from '../Screens/LinkMedicalRecords';
import Prompt from '../Plugins/PrompScreen';
const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        component={Login}
        title="Login"
        renderBackButton={() => <View />}
      />
      <Scene key="signup" component={SignUp} title="Signup" />
      <Scene key="otp" component={Otp} title="One Time Password" />
      <Scene key="tac" component={tac} title="Terms and Conditions" />
      <Scene key="qrscreen" component={QRScreen} title="My QR" />
      <Scene key="doctorsinfo" component={DoctorInfo} title="Doctors Info" />
      <Scene key="profile" component={MyProfile} title="My Profile" />
      <Scene key="safedavaoqr" component={SafeDavaoQR} title="Safe Davao QR" />
      <Scene key="uiapps" component={UIApps} title="Apps" />
      <Scene key="diagnostics" component={Diagnostic} title="Diagnostics" />
      <Scene key="prompt" component={Prompt} title="Alert" />
      <Scene
        key="link"
        component={LinkMedicalRecords}
        title="Link Medical Records"
      />
      <Scene
        key="diagnosticsresults"
        component={DiagnosticsResults}
        title="Results"
      />
      <Scene
        key="diagnosticsresultslist"
        component={DiagnosticsResultsList}
        title="Results List"
      />
      <Scene
        key="diagnosticsrequest"
        component={DiagnosticRequest}
        title="Diagnostics Request"
      />
      <Scene
        key="maindiagnosticsui"
        component={MainDiagnosticsUI}
        title="Diagnostics"
      />
      <Scene key="newsinfo" component={NewsInfo} title="Diagnostics" />
      <Scene key="calendar" component={CalendarEvents} title="Events" />
      <Scene key="index" component={Index} title="Home" initial="true" />
    </Scene>
  </Router>
);
export default Routes;
