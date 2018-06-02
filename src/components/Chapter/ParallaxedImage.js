import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Animated } from 'react-native'
import ImageAspectRatio from '../utils/ImageAspectRatio'
import ImageScalingRatio from '../utils/ImageScalingRatio'

export default class ParallaxedImage extends React.Component {

  static propTypes = {
    left: PropTypes.any,
    top: PropTypes.any,
    zIndex: PropTypes.number,
    scalingRatio: PropTypes.number,
    scrollX: PropTypes.any,
    speed: PropTypes.number
  }

  static defaultProps = {
    left: undefined,
    top: undefined,
    bottom: undefined,
    zIndex: undefined,
    scalingRatio: 1,
    speed: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        top: this.props.top,
        left: this.props.left,
        bottom: this.props.bottom,
        zIndex: this.props.zIndex
      }
    }
  }

  render () {
    return (
      <Animated.View shouldRasterizeIOS style={[{
        transform: [{
          translateX: this.props.scrollX.interpolate({
            inputRange:[0, 100],
            outputRange: [0, this.props.speed]
          })
        }]},
        this.state.styles, styles.image]}
      >
        <ImageScalingRatio scalingRatio={this.props.scalingRatio} src={this.props.src}/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    //flex: 1,
  }
})
