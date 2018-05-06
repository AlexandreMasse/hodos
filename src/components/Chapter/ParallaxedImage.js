import React from 'react'
import { StyleSheet, Image } from 'react-native'

export default class ParallaxedImage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        top: this.props.y,
        left: this.props.x,
        width: this.props.width,
        height: this.props.height
      }
    }
  }

  render () {
    return (
      <Image style={[styles.image, this.state.styles ]} source={this.props.src} />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    flex: 1,
    resizeMode: 'stretch'
  }
})
