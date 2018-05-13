// React
import React from 'react';
import {StyleSheet, YellowBox} from 'react-native';
import {StackNavigator} from 'react-navigation';
// Store / data
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
// Component
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Map from './src/components/Map/Map'
import Chapter from './src/components/Chapter/Chapter'
import Previously from './src/components/Chapter/Previously'
// Assets
import imageList from './src/assets/ImagesList'
// Expo
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

  // Get all Images require from ImageList
  _getImages = () => {
    var images = []
    function getAllValuesOfObject(obj) {
      for (let key in obj) {
        let value = obj[key]
        if(typeof value === 'object') {
          getAllValuesOfObject(value)
        } else {
          images.push(value)
        }
      }
    }
    getAllValuesOfObject(imageList)
    return images
  }

class App extends React.Component {

  state = {
    isReady: false
  };

  // Load asynchronously images and fonts
  async _loadAssetsAsync() {

    const imageAssets = _cacheImages([
      ..._getImages(),
      require('./src/assets/images/logo.png'),
      require('./src/assets/splash/splash.png'),
      require('./src/assets/images/map/map.png'),
      require('./src/assets/images/green-arrow-right.png'),
      require('./src/assets/images/white-arrow-right.png'),
      require('./src/assets/images/white-arrow-left.png'),

      require('./src/assets/images/arrow-left.png'),
      require('./src/assets/images/arrow-right.png'),

      require('./src/assets/images/Chapter1.png'),
      require('./src/assets/images/patternGrid.png'),
      require('./src/assets/images/backgroundCharacter.jpg'),
      require('./src/assets/images/chapters/previously.png'),
      require('./src/assets/images/menu.png')
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

  // Finish loading assets
  _handleFinishLoading = () => {
    console.log('App : finish loading assets')
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
  },
  Previously: {
    screen: Previously
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
  'Remote debugger is in a background tab'
]);


export default App;
