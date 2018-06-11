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
    // rotate: PropTypes.number,
    scalingRatio: PropTypes.number,
    speedX: PropTypes.number,
    speedY: PropTypes.number,
    parentWidth: PropTypes.number,
    opacityInputRange: PropTypes.array,
    opacityOutputRange: PropTypes.array,
    scaleInputRange: PropTypes.array,
    scaleOutputRange: PropTypes.array,
    rotateInputRange: PropTypes.array,
    rotateOutputRange: PropTypes.array,
  }

  static defaultProps = {
    left: undefined,
    top: undefined,
    bottom: undefined,
    zIndex: undefined,
    // rotate: 0,
    scalingRatio: 1,
    speedX: 0,
    speedY: 0,
    parentWidth: 0,
    opacityInputRange: [0, 1],
    opacityOutputRange: [1, 1],
    scaleInputRange: [0, 1],
    scaleOutputRange: [1, 1],
    rotateInputRange: [0, 1],
    rotateOutputRange: ['0deg', '0deg'],
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
          scale: this.props.scrollX.interpolate({
            inputRange: this.props.scaleInputRange.map((val) => (val / 100) * this.props.parentWidth),
            outputRange: this.props.scaleOutputRange,
            extrapolate: 'clamp',
          })
        },{
          // rotate: this.props.rotate + 'deg'
          rotate: this.props.scrollX.interpolate({
            inputRange: this.props.rotateInputRange.map((val) => (val / 100) * this.props.parentWidth),
            outputRange: this.props.rotateOutputRange,
            extrapolate: 'clamp',
          })
        }],
        opacity: this.props.scrollX.interpolate({
          inputRange: this.props.opacityInputRange.map((val) => (val / 100) * this.props.parentWidth),
          outputRange: this.props.opacityOutputRange,
          extrapolate: 'clamp',
        })
      },

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
