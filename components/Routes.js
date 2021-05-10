import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Prompt from '../Plugins/PrompScreen';
import Index from '../Screens/BottomNavigation';
import DoctorInfo from '../Screens/Doctors/DoctorsInfoScreen';
import LinkMedicalRecords from '../Screens/MedicalRecord/LinkMedicalRecords';
import Login from '../Screens/Login/LoginScreen';
import UIListOfFile from '../Screens/MedicalRecord/UIListOfFile';
import UIMedicalRecords from '../Screens/MedicalRecord/UIMedicalRecords';
import UIPatientFiles from '../Screens/MedicalRecord/UIPatientFiles';
import MyProfile from '../Screens/Me/MeInfoScreen';
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
import CalendarEvents from '../Screens/Calendar/UICalendar';
import Diagnostic from '../Screens/Diagnostics/UIDiagnostics';
import DiagnosticRequest from '../Screens/Diagnostics/UIDiagnosticsRequestList';
import DiagnosticsResultsList from '../Screens/Diagnostics/UIDiagnosticsResultsList';
import DiagnosticsResults from '../Screens/Diagnostics/UIDiagnoticsResults';
import UIFilePDFView from '../Screens/UIFilePDFView';
import MainDiagnosticsUI from '../Screens/Diagnostics/UIMainDiagnostics';
import {useSelector} from 'react-redux'
import { Icon } from 'react-native-vector-icons';

const Routes = () =>{
  const app_name = useSelector((state) => state.Default_Reducers.app_name);
  const VideoCallIcon = () => {
    return (
        <View style={{ marginRight: 10 }} >
            <TouchableOpacity onPress={() => Actions.videocall2()} >
                <Icon
                    name='comment'
                    type='font-awesome'
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};
return(
  
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        component={Login}
        title="Login"
        hideNavBar={true}
        renderBackButton={() => <View />}
      />
      <Scene key="signup" component={SignUp} title="Signup"    hideNavBar={true}/>
      <Scene key="otp" component={Otp} title="One Time Password" navTransparent={true}/>
      <Scene key="tac" component={tac} title="Terms and Conditions" navTransparent={true}/>
      <Scene key="qrscreen" component={QRScreen} title="My QR" navTransparent={true}/>
      <Scene key="doctorsinfo" component={DoctorInfo} title="Doctors Info" navTransparent={true}/>
      <Scene key="profile" component={MyProfile} title="My Profile" navTransparent={true}/>
      <Scene key="safedavaoqr" component={SafeDavaoQR} title="Safe Davao QR" navTransparent={true}/>
      <Scene key="uiapps" component={UIApps} title="Apps" navTransparent={true}/>
      <Scene key="diagnostics" component={Diagnostic} title="Diagnostics" navTransparent={true}/>
      <Scene key="prompt" component={Prompt} title="Alert" />
      <Scene key="files" component={UIPatientFiles} title="Files" navTransparent={true}/>
      <Scene key="pdfviewer" component={UIFilePDFView} title="File" navTransparent={true}/>
      <Scene key="listoffile" component={UIListOfFile} title="List of File" navTransparent={true}/>
      <Scene key="videocall" component={VideoCall} title="VideoCall" navTransparent={true}/>
      <Scene key="videocall2" component={VideoCallJisti} title="VideoCall" navTransparent={true}/>
      <Scene 
        key="message"
        component={Message}
        title="Message"

     
        
      />
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
      <Scene key="newsinfo" component={NewsInfo} title="News Info" navTransparent={true}/>
      <Scene key="calendar" component={CalendarEvents} title="Events" navTransparent={true}/>
      <Scene key="index" component={Index} title={app_name} initial="true" hideNavBar={true} />
    </Scene>
  </Router>
)};
export default Routes;
