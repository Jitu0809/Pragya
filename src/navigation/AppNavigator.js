import { createStackNavigator, createAppContainer,createSwitchNavigator } from "react-navigation";
import Home from '../screens/Home';
import About from "../screens/About";
import AssignedArea from '../screens/AssignedArea';
import AssignedAreaRNR from "../screens/AssignedAreaRNR";
import HazardList from '../screens/HazardList';
import HazardListRNR from "../screens/HazardListRNR";
import InputData from "../screens/InputData";
import AddObservation from "../screens/AddObservation";
import AddObservation2 from "../screens/AddObservation2";
import ReportCategory from "../screens/ReportCategory";
import ReportCategory2 from "../screens/ReportCategory2";
import ReportCategory3 from "../screens/ReportCategory3";
import SOSLevels from "../screens/SOSLevels";
import SOSLevels2 from "../screens/SOSLevels2";
import SOSLevels3 from "../screens/SOSLevels3";
import ObservationSite from "../screens/ObservationSite";
import Login from "../screens/Login";
import Form from "../screens/Form";
import Formsecond from "../screens/Formsecond";
import Formseconds from "../screens/Formseconds";
import Formsecond2 from "../screens/Formsecond2";
import Formseconds2 from "../screens/Formseconds2";

import LevelForm from "../screens/LevelForm";
import LevelForm2 from "../screens/LevelForm2";

import Contacts from "../screens/Contacts";
import POPDetails from '../screens/POPDetails';
import ControlDetails from '../screens/ControlDetails';
import Form1 from '../screens/Form1';
import Form3 from "../screens/Form3";
import Form4 from "../screens/Form4";
import Form5 from "../screens/Form5";
import DisplacedPopulation from "../screens/DisplacedPopulation";
import EmergingConcerns from "../screens/EmergingConcerns";
import SituationUpdate from "../screens/SituationUpdate";


const RootStack = createStackNavigator({
   
    Home: {
        screen: Home
    },
    About:{
        screen:About
    },
    AssignedArea: {
        screen: AssignedArea
    },
    AssignedAreaRNR: {
        screen: AssignedAreaRNR
    },
    HazardList: {
        screen: HazardList
    },
    HazardListRNR:{
        screen: HazardListRNR
    },

    InputData: {
        screen: InputData
    },
    AddObservation: {
        screen: AddObservation
    },
    AddObservation2: {
        screen: AddObservation2
    },
    ReportCategory: {
        screen: ReportCategory
    },
    ReportCategory2: {
        screen: ReportCategory2
    },
    ReportCategory3: {
        screen: ReportCategory3
    },
    SOSLevels: {
        screen: SOSLevels
    },
    SOSLevels2: {
        screen: SOSLevels2
    },
    SOSLevels3: {
        screen: SOSLevels3
    },
    ObservationSite: {
        screen: ObservationSite
    },
    Login: {
        screen: Login,
    },
    LevelForm:{
        screen:LevelForm
    },
    LevelForm2:{
        screen:LevelForm2
    },
    Form:{
        screen:Form
    },
    Formsecond:{
        screen:Formsecond
    },
    Formseconds:{
        screen:Formseconds
    },
    Formsecond2:{
        screen:Formsecond2
    },
    Formseconds2:{
        screen:Formseconds2
    },
    Form1:{
        screen:Form1
    },
    Form3:{
        screen:Form3
    },
    Form4:{
        screen:Form4
    },
    Form5:{
        screen:Form5
    },
    DisplacedPopulation:{
        screen:DisplacedPopulation
    },
    EmergingConcerns:{
        screen:EmergingConcerns
    },
    SituationUpdate:{
       screen:SituationUpdate
    },
    Contacts:{
        screen:Contacts
    },
    POPDetails:{
        screen:POPDetails
    },
    ControlDetails:{
        screen:ControlDetails
    }

}, {
        initialRouteName: 'Login',
        headerMode: 'none'
    })


    


const AppNavigator2 = createAppContainer(RootStack)

export default AppNavigator2;