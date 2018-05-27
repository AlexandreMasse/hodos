import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import('./images/img_0.png')

export default class Animation extends React.Component {
  state = {
    loop: true,
  }
  componentDidMount() {
    this.animation.play();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <Lottie
            ref={animation => { this.animation = animation; }}
            style={styles.animation}
            source={require('./data.json')}
            loop={this.state.loop}
            imageAssetsFolder="images"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,255,255, 0.2)',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 400,
    height: 400,
  },
  animation: {
    // width: 500,
    // height: 500,
    flex: 1,
  },
});
