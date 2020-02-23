import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

export default class LottieAnimation extends React.Component {

  static propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    styles: PropTypes.any,
    isLoop: PropTypes.bool,
    source: PropTypes.any,
    delay: PropTypes.number,
    speed: PropTypes.number,
    progress: PropTypes.number,
    play: PropTypes.bool,
  }

  static defaultProps = {
    width: 500,
    height: 500,
    styles: {},
    isLoop: true,
    source: require('./olympe-bg.json'),
    delay: 100,
    speed: 1,
    progress: 0,
    play: true
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoop: this.props.isLoop,
    }
  }

  componentDidMount() {
    if(this.props.play) {
      if (this.animation) {
        setTimeout(() => {
          if (this.animation) {
            this.animation.play();
          }
        }, this.props.delay)
      }
    }
  }

  componentWillReceiveProps(nextProps) {

    if(this.props !== nextProps){
      if(nextProps.play) {
          setTimeout(() => {
            if (this.animation) {
              this.animation.play();
            }
          }, nextProps.delay)
      }
    }
  }

  render() {
    return (
      <View style={[styles.animationContainer, {
        width: this.props.width,
        height: this.props.height
      }, this.props.styles]} pointerEvents="none">
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={styles.animation}
          source={this.props.source}
          loop={this.state.isLoop}
          speed={this.props.speed}
          progress={this.props.progress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
  },
  animation: {
    flex: 1,
  },
});
