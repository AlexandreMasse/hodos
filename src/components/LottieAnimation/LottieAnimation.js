import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class LottieAnimation extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isLoop: PropTypes.bool,
    source: PropTypes.any,
    delay: PropTypes.number,
    speed: PropTypes.number,
  }

  static defaultProps = {
    width: 500,
    height: 500,
    isLoop: true,
    source: require('./nuage-degrade.json'),
    delay: 0,
    speed: 1,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoop: this.props.isLoop,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.animation.play();
    }, this.props.delay)
  }

  render() {
    return (
        <View style={[styles.animationContainer, {
          width: this.props.width,
          height: this.props.height,
        }]}>
          <Lottie
            ref={animation => { this.animation = animation; }}
            style={styles.animation}
            source={this.props.source}
            loop={this.state.isLoop}
            speed={this.props.speed}
            // autoSize={true}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'red',
  },
  animation: {
    flex: 1,
  },
});
