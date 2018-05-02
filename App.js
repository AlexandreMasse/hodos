import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
import Test2 from './src/components/test2'
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Map from './src/components/Map/Map'
import Chapter from './src/components/Chapter/Chapter'
import { Asset, AppLoading } from 'expo';

class App extends React.Component {

  state = {
    isReady: false,
  };

  componentWillMount () {
    storageSessionManager.setDataForSession()

    /*setTimeout(() => {
      this.setState({
        isReady: true,
      })
    }, 2000)*/
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

  async _cacheResourcesAsync() {
    const images = [
      require('./src/assets/logo.png'),
      require('./src/assets/map.png'),
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
}


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
  initialRouteName: "HomeScreen",
  headerMode: 'none'
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
