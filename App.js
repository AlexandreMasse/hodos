import React from 'react';
import {StyleSheet, YellowBox} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Map from './src/components/Map/Map'
import Chapter from './src/components/Chapter/Chapter'
import { Asset, AppLoading } from 'expo';
import SvgTest from "./src/components/SvgTest";

class App extends React.Component {

  state = {
    isReady: false,
  };

  async _cacheResourcesAsync() {
    const images = [
      require('./src/assets/logo.png'),
      require('./src/assets/map.png'),
      require('./src/assets/Chap27_part1.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  _handleFinishLoading = () => {
    console.log("finish loading assets");
    this.setState({ isReady: true })
  };

  componentWillMount () {
    storageSessionManager.setDataForSession()
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading startAsync={this._cacheResourcesAsync}
                    onFinish={this._handleFinishLoading}
                    onError={console.warn}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
      )
    }
  }
}


// NAVIGATION CONFIGURATION

const AppNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  Map: {
    screen: Map
  },
  Chapter : {
    screen: Chapter
  },
  Svg: {
    screen: SvgTest
  }
},{
  initialRouteName: "HomeScreen",
  headerMode: 'none'
})


// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Remove some warning for dev

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);


export default App;
