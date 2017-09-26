/* @flow */

import React from "react";
import { StackNavigator } from "react-navigation";

// screens identified by the router
import FeedScreen from '../Containers/FeedScreen'
import UserScreen from '../Containers/UserScreen'
import ServiceScreen from '../Containers/ServiceScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import EditServiceScreen from '../Containers/EditServiceScreen'
import EditProfileScreen from '../Containers/EditProfileScreen'
import CurrencyScreen from '../Containers/CurrencyScreen'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import AboutScreen from '../Containers/AboutScreen'


// import Home from "./components/home/";
// import Header from "./components/Header/";
// import Anatomy from "./components/anatomy/";
// import Footer from "./components/footer/";
// import NHBadge from "./components/badge/";
// import NHButton from "./components/button/";
// import NHCard from "./components/card/";
// import NHCheckbox from "./components/checkbox/";
// import NHDeckSwiper from "./components/deckswiper/";
// import NHFab from "./components/fab/";
// import NHForm from "./components/form/";
// import TextArea from "./components/form/textArea";
// import NHIcon from "./components/icon/";
// import ListSwipe from "./components/listSwipe/";
// import BasicIcon from "./components/icon/basic";
// import IconState from "./components/icon/state";
// import SpecificIcon from "./components/icon/specific";
// import NHInputGroup from "./components/inputgroup/";
// import NHLayout from "./components/layout/";
// import NHList from "./components/list/";
// import NHRadio from "./components/radio/";
// import NHSearchbar from "./components/searchbar/";
// import NHSpinner from "./components/spinner/";
// import NHPicker from "./components/picker/";
// import NHTab from "./components/tab/";
// import NHThumbnail from "./components/thumbnail/";
// import NHTypography from "./components/typography/";
// import SplashPage from "./components/splashscreen/";
import SideBar from "../Components/Sidebar";
// import Segment from "./components/segment";
// import Toast from "./components/toast";
// import Actionsheet from "./components/actionsheet";

const FeedStack = StackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
//    AboutScreen: { screen: AboutScreen },
//    ServiceScreen: { screen: ServiceScreen },
//    FeedScreen: { screen: FeedScreen },
//    AboutScreen: { screen: AboutScreen },
//    ServiceScreen: { screen: ServiceScreen },
//    UserScreen: { screen: UserScreen },
//    ProfileScreen: { screen: ProfileScreen },
//    EditServiceScreen: { screen: EditServiceScreen },
//    EditProfileScreen: { screen: EditProfileScreen },
//    LoginScreen: { screen: LoginScreen },
//    SignupScreen: { screen: SignupScreen },
//     Anatomy: { screen: Anatomy },
//     Header: { screen: Header },
//     Footer: { screen: Footer },
//     NHBadge: { screen: NHBadge },
//     NHButton: { screen: NHButton },
//     NHCard: { screen: NHCard },
//     NHCheckbox: { screen: NHCheckbox },
//     NHDeckSwiper: { screen: NHDeckSwiper },
//     NHFab: { screen: NHFab },
//     NHForm: { screen: NHForm },
//     TextArea: { screen: TextArea },
//     NHIcon: { screen: NHIcon },
//     BasicIcon: { screen: BasicIcon },
//     IconState: { screen: IconState },
//     SpecificIcon: { screen: SpecificIcon },
//     NHInputGroup: { screen: NHInputGroup },
//     NHLayout: { screen: NHLayout },
//     NHList: { screen: NHList },
//     ListSwipe: { screen: ListSwipe },
//     NHRadio: { screen: NHRadio },
//     NHSearchbar: { screen: NHSearchbar },
//     NHSpinner: { screen: NHSpinner },
//     NHPicker: { screen: NHPicker },
//     NHTab: { screen: NHTab },
//     NHThumbnail: { screen: NHThumbnail },
//     NHTypography: { screen: NHTypography },
//     Segment: { screen: Segment },
//     Toast: { screen: Toast },
//     Actionsheet: { screen: Actionsheet }
  },
  {
    initialRouteName: "FeedScreen",
    headerMode: "none",
//    backBehavior: "none",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
  }
);

export default FeedStack;
