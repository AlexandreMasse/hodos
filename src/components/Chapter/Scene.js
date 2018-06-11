import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Image, Dimensions} from 'react-native'
import resolveAssetSource from 'resolveAssetSource'
import PinchZoomView from "../Map/PinchZoomView";

export default class Scene extends React.Component {

  static propTypes = {
    windowHeight: PropType.number,
    zIndex: PropType.number,
    src: PropType.any.isRequired,
    styles: PropType.object
  }

  static defaultProps = {
    windowHeight: Dimensions.get('window').height,
    styles: {}
  }

  constructor(props) {
    super(props)
    this.sourceInfo = resolveAssetSource(this.props.src)

    const windowHeight = this.props.windowHeight

    this.state = {
      styles: {
        height: windowHeight,
        width: (windowHeight / this.sourceInfo.height) * this.sourceInfo.width,
        zIndex: this.props.zIndex
      }
    }
  }

  render () {
    return (
      <Image style={[styles.scene, this.state.styles, this.props.styles ]} source={this.props.src} />
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    // flex: 1,
    resizeMode: 'cover'
  }
})
