import React from 'react';
import {Actions, Router, Scene} from 'react-native-router-flux';
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
import UIPin from '../Screens/PIN/UIPin';
import UIMedicalRecords from '../Screens/MedicalRecord/UIMedicalRecords';
import UIPatientFiles from '../Screens/MedicalRecord/UIPatientFiles';
import LinkMedicalRecords from '../Screens/LinkMedicalRecords';
import Prompt from '../Plugins/PrompScreen';
import UIFilePDFView from '../Screens/UIFilePDFView';
import UIListOfFile from '../Screens/MedicalRecord/UIListOfFile';

import Message from '../Screens/Message/Message';
import VideoCall from '../Screens/Message/VideoCall/VideoCall';
import VideoCallJisti from '../Screens/Message/VideoCall/VideoCallJisti';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

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
      <Scene key="files" component={UIPatientFiles} title="Files" />
      <Scene key="pdfviewer" component={UIFilePDFView} title="File" />
      <Scene key="listoffile" component={UIListOfFile} title="List of File" />
      <Scene key="videocall" component={VideoCall} title="VideoCall" />
      <Scene key="videocall2" component={VideoCallJisti} title="VideoCall" />
      <Scene
        key="message"
        component={Message}
        title="Message"
        onRight={() => Actions.videocall2()}
        rightButtonImage={require('../assets/icons/messages.png')}
      />
      <Scene
        key="pin"
        component={UIPin}
        title="PIN"
        renderBackButton={() => <View />}
      />
      <Scene
        key="link"
        component={LinkMedicalRecords}
        title="Link Medical Records"
      />
      <Scene
        key="medicalrecords"
        component={UIMedicalRecords}
        title="Medical Records"
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
