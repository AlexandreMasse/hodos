import React from 'react';
import {StyleSheet, View} from 'react-native';
import {store} from './src/store/reducers/index'
import {Provider} from 'react-redux'
import Test2 from './src/components/test2'
import { API } from "./src/store/api";

class App extends React.Component {

  componentWillMount () {
    API.getPlaceList()
    API.getCharacterList()
    API.getChapterList()
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
