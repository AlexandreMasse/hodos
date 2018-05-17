import {StackNavigator, DrawerNavigator} from 'react-navigation';
import SideMenu from './SideMenu/SideMenu';
import HomeScreen from "./HomeScreen/HomeScreen";
import Map from "./Map/Map";
import Previously from "./Chapter/Previously";
import Chapter from "./Chapter/Chapter";
import Profile from './Profile/Profile'

import {colors, fonts} from '../assets/variables'

// NAVIGATION CONFIGURATION

// export default AppNavigator = StackNavigator({
//   HomeScreen: {
//     screen: HomeScreen
//   },
//   Map: {
//     screen: Map
//   },
//   Chapter : {
//     screen: Chapter
//   },
//   Previously: {
//     screen: Previously
//   }
// },{
//   initialRouteName: 'HomeScreen',
//   headerMode: 'none',
//   navigationOptions: {
//     gesturesEnabled: false,
//   },
// })


export default AppNavigator = DrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    Map: {
      screen: Map
    },
    Chapter : {
      screen: Chapter
    },
    Previously: {
      screen: Previously
    },
    Profile: {
      screen: Profile
    }
  },
  {
    drawerWidth: 300,
    initialRouteName: 'HomeScreen',
    drawerPosition: 'left',
    drawerBackgroundColor: 'white',
    contentComponent: SideMenu,
    contentOptions: {
      labelStyle: {
        textAlign: 'center',
        width: '100%',
        marginTop: 17,
        marginRight: 0,
        marginBottom: 17,
        marginLeft: 0,
        fontSize: 18,
      },
      activeLabelStyle: {
        fontFamily: fonts.RubikMedium,
      },
       inactiveLabelStyle: {
        fontFamily: fonts.RubikRegular,
      },
      activeTintColor : '#00a7f5',
      inactiveTintColor : colors.grey,
      activeBackgroundColor: 'transparent',
    }
  }
)
