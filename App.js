import React from 'react';
import {StyleSheet, View} from 'react-native';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import storageSessionManager from './src/store/StorageSessionManager'
import Test2 from './src/components/test2'

class App extends React.Component {

  componentWillMount () {
    storageSessionManager.setDataForSession()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Test2/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
