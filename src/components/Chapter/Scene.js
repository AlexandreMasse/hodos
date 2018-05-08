import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Image, Dimensions} from 'react-native'
import resolveAssetSource from 'resolveAssetSource'
import PinchZoomView from "../../lib/PinchZoomView";

export default class Scene extends React.Component {

  static propTypes = {
    windowHeight: PropType.number,
    src: PropType.any.isRequired
  }

  static defaultProps = {
    windowHeight: Dimensions.get('window').height
  }

  constructor(props) {
    super(props)
    this.sourceInfo = resolveAssetSource(this.props.src)

    const windowHeight = this.props.windowHeight

    this.state = {
      styles: {
        height: windowHeight,
        width: (windowHeight / this.sourceInfo.height) * this.sourceInfo.width,
      }
    }

    console.log([styles.scene, this.state.styles ])
  }

  render () {
    return (
      <Image style={[styles.scene, this.state.styles ]} source={this.props.src} />
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    // flex: 1,
    resizeMode: 'cover'
  }
})
