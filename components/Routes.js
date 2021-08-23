import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import Prompt from '../Plugins/PrompScreen';
import Index from '../Screens/-Main/MainNavigation';
import CalendarEvents from '../Screens/Calendar/UICalendar';
import Diagnostic from '../Screens/Diagnostics/UIDiagnostics';
import DiagnosticRequest from '../Screens/Diagnostics/UIDiagnosticsRequestList';
import DiagnosticsResultsList from '../Screens/Diagnostics/UIDiagnosticsResultsList';
import DiagnosticsResults from '../Screens/Diagnostics/UIDiagnoticsResults';
import MainDiagnosticsUI from '../Screens/Diagnostics/UIMainDiagnostics';
import DoctorInfo from '../Screens/Doctors/DoctorsInfoScreen';
import Login from '../Screens/Login/LoginScreen';
import MyProfile from '../Screens/Me/MeInfoScreen';
import LinkMedicalRecords from '../Screens/MedicalRecord/LinkMedicalRecords';
import UIListOfFile from '../Screens/MedicalRecord/UIListOfFile';
import UIMedicalRecords from '../Screens/MedicalRecord/UIMedicalRecords';
import UIPatientFiles from '../Screens/MedicalRecord/UIPatientFiles';
import Message from '../Screens/Message/Message';
import VideoCall from '../Screens/Message/VideoCall/VideoCall';
import VideoCallJisti from '../Screens/Message/VideoCall/VideoCallJisti';
import QRScreen from '../Screens/MyQRCodeScreen';
import NewsInfo from '../Screens/News/NewsInfo/UINewsInfo';
import Otp from '../Screens/OTPScreen';
import UIPin from '../Screens/PIN/UIPin';
import SafeDavaoQR from '../Screens/SafeDavaoQR';
import SignUp from '../Screens/SignUpScreen';
import tac from '../Screens/TermsAndConditions';
import UIApps from '../Screens/UIApps/UIApps';
import IndexQueue from '../Screens/Queing/Queueing';
import GenerateQueue from '../Screens/Queing/IndexQueue';
import ViewNumbersonQueue from '../Screens/Queing/QueueNumbers';
import UIFilePDFView from '../Screens/UIFilePDFView';
import styles from './style';
import {TOGGLE_SWITCH} from '../Services/Actions/Diagnostic_Actions';
const Routes = () => {
  const app_name = useSelector((state) => state.Default_Reducers.app_name);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setIsEnabled((previousState) => !previousState);
      await dispatch(TOGGLE_SWITCH(isEnabled));
      console.log(isEnabled);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, isEnabled]);
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
      <Stack key="root">
        <Scene key="home" component={Login} title="Login" hideNavBar={true} />
        <Scene
          key="signup"
          component={SignUp}
          title="Signup"
          hideNavBar={true}
        />
        <Scene
          key="otp"
          component={Otp}
          title="One Time Password"
          hideNavBar={true}
        />
        <Scene
          key="tac"
          component={tac}
          title="Terms and Conditions"
          hideNavBar={true}
        />
        <Scene
          key="qrscreen"
          component={QRScreen}
          title="My QR"
          navTransparent={true}
        />
        <Scene
          key="doctorsinfo"
          component={DoctorInfo}
          title="Doctors Info"
          navTransparent={true}
        />
        <Scene
          key="profile"
          component={MyProfile}
          title="My Profile"
          navTransparent={true}
        />
        <Scene
          key="safedavaoqr"
          component={SafeDavaoQR}
          title="Safe Davao QR"
          navTransparent={true}
        />
        <Scene key="indexqueue" component={IndexQueue} title="Queue" />
        <Scene
          key="numbersonqueue"
          component={ViewNumbersonQueue}
          title="Numbers On Queue"
        />
        <Scene
          key="generatenumber"
          component={GenerateQueue}
          title="Generate Number"
          navTransparent={true}
        />
        <Scene
          key="uiapps"
          component={UIApps}
          title="Apps"
          navTransparent={true}
        />
        <Scene
          key="diagnostics"
          component={Diagnostic}
          //   renderRightButton={()=> (
          //     <View>
          //        <Switch
          //       trackColor={{false: '#767577', true: '#add8e6'}}
          //       thumbColor={isEnabled ? '#add8e6' : '#f4f3f4'}
          //       ios_backgroundColor="#3e3e3e"
          //       onValueChange={toggleSwitch}
          //       value={isEnabled}
          //       accessibilityLabel={'Use My Information'}
          //     />
          //     </View>
          // )}
          title="Diagnostics"
          navTransparent={true}
        />
        <Scene key="prompt" component={Prompt} title="Alert" />
        <Scene
          key="files"
          component={UIPatientFiles}
          title="Files"
          navTransparent={true}
        />
        <Scene
          key="pdfviewer"
          component={UIFilePDFView}
          title="File"
          navTransparent={true}
        />
        <Scene
          key="listoffile"
          component={UIListOfFile}
          title="List of File"
          navTransparent={true}
        />
        <Scene
          key="videocall"
          component={VideoCall}
          title="VideoCall"
          navTransparent={true}
        />
        <Scene
          key="videocall2"
          component={VideoCallJisti}
          title="VideoCall"
          navTransparent={true}
        />
        <Scene key="message" component={Message} title="Message" />
        <Scene
          key="pin"
          component={UIPin}
          title="PIN"
          hideNavBar={true}
          renderBackButton={() => <View />}
        />
        <Scene
          key="link"
          component={LinkMedicalRecords}
          title="Link Medical Records"
          navTransparent={true}
        />
        <Scene
          key="medicalrecords"
          component={UIMedicalRecords}
          title="Medical Records"
          navTransparent={true}
        />
        <Scene
          key="diagnosticsresults"
          component={DiagnosticsResults}
          title="Results"
          navTransparent={true}
        />
        <Scene
          key="diagnosticsresultslist"
          component={DiagnosticsResultsList}
          title="Results List"
          navTransparent={true}
        />
        <Scene
          key="diagnosticsrequest"
          component={DiagnosticRequest}
          title="Diagnostics Request"
          navTransparent={true}
        />
        <Scene
          key="maindiagnosticsui"
          component={MainDiagnosticsUI}
          title="Diagnostics"
          navTransparent={true}
        />

        <Scene
          key="newsinfo"
          component={NewsInfo}
          navTransparent={true}
          title="News Info"
        />

        <Scene
          key="calendar"
          component={CalendarEvents}
          title="Events"
          navTransparent={true}
        />
        <Scene
          key="index"
          component={Index}
          title={app_name}
          initial="true"
          hideNavBar={true}
        />
      </Stack>
    </Router>
  );
};
export default Routes;
