import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Animated } from 'react-native'
import ImageAspectRatio from '../utils/ImageAspectRatio'
import ImageScalingRatio from '../utils/ImageScalingRatio'

export default class ParallaxedImage extends React.Component {

  static propTypes = {
    scrollX: PropTypes.any.isRequired,
    left: PropTypes.any,
    top: PropTypes.any,
    zIndex: PropTypes.number,
    rotate: PropTypes.number,
    scalingRatio: PropTypes.number,
    speedX: PropTypes.number,
    speedY: PropTypes.number
  }

  static defaultProps = {
    left: undefined,
    top: undefined,
    bottom: undefined,
    zIndex: undefined,
    rotate: 0,
    scalingRatio: 1,
    speedX: 0,
    speedY: 0
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
            outputRange: [0, this.props.speedX]
          })
        },{
          translateY: this.props.scrollX.interpolate({
            inputRange:[0, 100],
            outputRange: [0, this.props.speedY]
          })
        }, {
          rotate: this.props.rotate + 'deg'
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
