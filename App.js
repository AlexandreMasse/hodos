import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import Test1 from './src/components/test1'
import Test2 from './src/components/test2'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Test1/>
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
