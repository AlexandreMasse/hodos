import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'
import ImageAspectRatio from '../utils/ImageAspectRatio'
import ImageScalingRatio from '../utils/ImageScalingRatio'

export default class ParallaxedImage extends React.Component {

  static propTypes = {
    left: PropTypes.any,
    top: PropTypes.any,
    scalingRatio: PropTypes.number,
  }

  static defaultProps = {
    left: undefined,
    top: undefined,
    bottom: undefined,
    scalingRatio: 1,
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        top: this.props.top,
        left: this.props.left,
        bottom: this.props.bottom,
      },
    }
  }

  render () {
    return (
      <ImageScalingRatio scalingRatio={this.props.scalingRatio} styles={[this.state.styles, styles.image]} src={this.props.src}/>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    //flex: 1,
  }
})
