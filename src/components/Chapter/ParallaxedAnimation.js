import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Animated } from 'react-native'
import LottieAnimation from "../LottieAnimation/LottieAnimation";

export default class ParallaxedAnimation extends React.Component {

  static propTypes = {
    scrollX: PropTypes.any.isRequired,
    styles: PropTypes.any,
    isLoop: PropTypes.bool,
    source: PropTypes.any,
    delay: PropTypes.number,
    speedAnimation: PropTypes.number,
    progress: PropTypes.number,
    speed: PropTypes.number
  }

  static defaultProps = {
    styles: {},
    isLoop: undefined,
    delay: undefined,
    speedAnimation: undefined,
    progress: undefined,
    speed: 0
  }

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Animated.View shouldRasterizeIOS style={[{
        transform: [{
          translateX: this.props.scrollX.interpolate({
            inputRange:[0, 100],
            outputRange: [0, this.props.speed]
          })
        }]}, this.props.styles]}
      >
        <LottieAnimation source={this.props.source}
                         isLoop={this.props.isLoop}
                         progress={this.props.progress}
                         delay={this.props.delay}
                         speed={this.props.speedAnimation}
                         styles={styles.animation}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
  }
})
