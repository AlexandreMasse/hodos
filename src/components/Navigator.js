import {StackNavigator, DrawerNavigator} from 'react-navigation';
import {Animated, Easing} from 'react-native'
import SideMenu from './SideMenu/SideMenu';
import HomeScreen from "./HomeScreen/HomeScreen";
import Map from "./Map/Map";
import Previously from "./Chapter/Previously";
import Chapter from "./Chapter/Chapter";
import Profile from './Profile/Profile'
import Intro from "./Intro/Intro";
import Characters from "./Characters/Characters";
import Settings from "./Settings/Settings";

import {colors, fonts} from '../assets/variables'

// TRANSITION

const fade = (props) => {
  const {position, scene} = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  })

  return {
    opacity,
    transform: [{translateX}, {translateY}]
  }
}

const introFade = (props) => {
  const {position, scene} = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  })

  return {
    opacity,
    transform: [{translateX}, {translateY}]
  }
}


// INTRO STACK NAVIGATOR

export const IntroStackNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  Intro: {
    screen: Intro
  }
},{
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 700,
      // easing: Easing.out(Easing.poly(4)),
      // timing: Animated.timing,
    },
    screenInterpolator: (props) => {
      return introFade(props)
    }
  })
})


// MAIN DRAWER NAVIGATOR

export const MainDrawerNavigator = DrawerNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions : {
        drawerLabel: 'Plan'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions : {
        title: 'Profil'
      }
    },
    Characters: {
      screen: Characters,
      navigationOptions : {
        title: 'Personnages'
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions : {
        title: 'Paramètres'
      }
    },
    // HIDDEN SCREENS
    Chapter : {
      screen: Chapter,
      navigationOptions : {
        drawerLabel: () => null
      }
    },
    Previously: {
      screen: Previously,
      navigationOptions : {
        drawerLabel: () => null
      }
    },
  },
  {
    drawerWidth: 300,
    initialRouteName: 'Characters',
    drawerPosition: 'left',
    drawerBackgroundColor: 'white',
    contentComponent: SideMenu,
    contentOptions: {
      labelStyle: {
        textAlign: 'center',
        width: '100%',
        marginTop: 15,
        marginRight: 0,
        marginBottom: 17,
        marginLeft: 0,
        fontSize: 22,
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
    },
  }
)


// APP STACK NAVIGATOR

export const AppStackNavigator = StackNavigator({
  IntroStackNavigator: {
    screen: IntroStackNavigator
  },
  MainDrawerNavigator: {
    screen: MainDrawerNavigator
  }
},{
  initialRouteName: 'IntroStackNavigator',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 1000,
      //easing: Easing.out(Easing.poly(4)),
      //timing: Animated.timing,
    },
    screenInterpolator: (props) => {
      return fade(props)
    }
  })
})
