// React
import React from 'react';
import {StyleSheet, YellowBox, TouchableOpacity, Text, View} from 'react-native';
// Store / data
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
//Navigator
import AppNavigator from './src/components/Navigator'
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
      ..._getImages()
    ]);

    const fontAssets = _cacheFonts([
      {name: 'alcubierre', font: require('./src/assets/fonts/Alcubierre/Alcubierre.otf')},
      {name: 'rubik-black', font: require('./src/assets/fonts/Rubik/Rubik-Black.ttf')},
      {name: 'rubik-bold', font: require('./src/assets/fonts/Rubik/Rubik-Bold.ttf')},
      {name: 'rubik-medium', font: require('./src/assets/fonts/Rubik/Rubik-Medium.ttf')},
      {name: 'rubik-regular', font: require('./src/assets/fonts/Rubik/Rubik-Regular.ttf')},
      {name: 'rubik-light', font: require('./src/assets/fonts/Rubik/Rubik-Light.ttf')}
    ]);

    await Promise.all([...fontAssets, ...imageAssets]);

  }

  // Finish loading assets
  _handleFinishLoading = () => {
    console.log('App : finish loading assets')

    setTimeout(() => {
      this.setState({ isReady: true})
    }, 100)

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
            <AppNavigator/>
        </Provider>
      )
    }
  }
}

// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 30,
    left: 10
  }
});

// Remove some warning for dev

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Remote debugger is in a background tab'
]);


export default App;
