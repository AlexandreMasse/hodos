// React
import React from 'react';
import {StyleSheet, YellowBox, TouchableOpacity, Text, View, StatusBar} from 'react-native';
// Store / data
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
//Navigator
import {AppStackNavigator} from './src/components/Navigator'
// Assets
import imageList from './src/assets/ImagesList'
import SoundsList from './src/assets/SoundsList'
// Expo
import { Asset, AppLoading, Font, Audio } from 'expo';

  _cacheFiles = (files) => {
    return files.map(file => {
      if (typeof file === 'string') {
        return Image.prefetch(file);
      } else {
        return Asset.fromModule(file).downloadAsync()
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

  _getAudios = () => {
    const audios = []
    function getAllValuesOfObject(obj) {
      for (let key in obj) {
        let value = obj[key]
        if(typeof value === 'object') {
          getAllValuesOfObject(value)
        } else {
          audios.push(value)
        }
      }
    }
    getAllValuesOfObject(SoundsList)
    return audios
  }

class App extends React.Component {

  state = {
    isReady: false
  };

  // Load asynchronously images and fonts
  async _loadAssetsAsync() {

    const imageAssets = _cacheFiles([
      ..._getImages()
    ])

    const soundsAsset = _cacheFiles([
      ..._getAudios()
    ])

    const fontAssets = _cacheFonts([
      {name: 'alcubierre', font: require('./src/assets/fonts/Alcubierre/Alcubierre.otf')},
      {name: 'rubik-black', font: require('./src/assets/fonts/Rubik/Rubik-Black.ttf')},
      {name: 'rubik-bold', font: require('./src/assets/fonts/Rubik/Rubik-Bold.ttf')},
      {name: 'rubik-medium', font: require('./src/assets/fonts/Rubik/Rubik-Medium.ttf')},
      {name: 'rubik-regular', font: require('./src/assets/fonts/Rubik/Rubik-Regular.ttf')},
      {name: 'rubik-light', font: require('./src/assets/fonts/Rubik/Rubik-Light.ttf')}
    ])

    await Promise.all([...fontAssets, ...imageAssets, ...soundsAsset])

  }

  // Finish loading assets
  _handleFinishLoading = () => {
    console.log('App : finish loading assets')

    setTimeout(() => {
      this.setState({ isReady: true})
    }, 200)

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
          <View style={{flex: 1}}>
            <StatusBar hidden={true}/>
            <AppStackNavigator/>
          </View>
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

//console.disableYellowBox = true;


export default App;
