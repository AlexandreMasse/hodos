import React from 'react';
import {StyleSheet, YellowBox} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Map from './src/components/Map/Map'
import Chapter from './src/components/Chapter/Chapter'
import { Asset, AppLoading, Font } from 'expo';

_cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  _cacheFonts = (fonts) => {
    return fonts.map( font => {
      const name = font.name
      const fontSrc = font.font

      let fontObject = {}
      fontObject[name] = fontSrc
      Font.loadAsync(fontObject)
    })
  }

class App extends React.Component {

  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = _cacheImages([
      require('./src/assets/images/logo.png'),
      require('./src/assets/splash/splash.png'),
      require('./src/assets/images/map/map.png'),
      require('./src/assets/images/green-arrow-right.png'),
      require('./src/assets/images/white-arrow-right.png'),
      require('./src/assets/images/white-arrow-left.png'),
      require('./src/assets/images/chapters/Chap27_part1.png'),
      require('./src/assets/images/chapters/Chap27_palais.png'),
      require('./src/assets/images/chapters/Chap27_rochers.png'),
    ]);


    const fontAssets = _cacheFonts([
      {name: 'alcubierre', font: require('./src/assets/fonts/Alcubierre/Alcubierre.otf')},
      {name: 'rubik-black', font: require('./src/assets/fonts/Rubik/Rubik-Black.ttf')},
      {name: 'rubik-bold', font: require('./src/assets/fonts/Rubik/Rubik-Bold.ttf')},
      {name: 'rubik-medium', font: require('./src/assets/fonts/Rubik/Rubik-Medium.ttf')},
      {name: 'rubik-regular', font: require('./src/assets/fonts/Rubik/Rubik-Regular.ttf')},
      {name: 'rubik-light', font: require('./src/assets/fonts/Rubik/Rubik-Light.ttf')}
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);

  }
  _handleFinishLoading = () => {
    console.log("finish loading assets")
    this.setState({ isReady: true})
  };

  componentWillMount () {
    storageSessionManager.setDataForSession()
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading startAsync={this._loadAssetsAsync}
                    onFinish={this._handleFinishLoading}
                    onError={console.warn}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
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
  }
},{
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
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
