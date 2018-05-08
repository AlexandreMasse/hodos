import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'
import ImageAspectRatio from '../utils/ImageAspectRatio'

export default class ParallaxedImage extends React.Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    x: 0,
    y: 0,
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
      <ImageAspectRatio width={this.props.width} height={this.props.height} styles={[this.state.styles, styles.image]} source={this.props.src} src={this.props.src}/>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    flex: 1,
  }
})
