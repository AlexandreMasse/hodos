import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

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
            source={require('./nuage-degrade.json')}
            loop={this.state.loop}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgba(0,255,255, 1)',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 1000,
    height: 800,
  },
  animation: {
    // width: 400,
    // height: 400,
    flex: 1,
  },
});
