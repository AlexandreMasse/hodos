import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'
import ImageAspectRatio from '../utils/ImageAspectRatio'
import ImageScalingRatio from '../utils/ImageScalingRatio'

export default class ParallaxedImage extends React.Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    scalingRatio: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    scalingRatio: 0.5,
    width: undefined,
    height: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        top: this.props.y,
        left: this.props.x,
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
    flex: 1,
  }
})
