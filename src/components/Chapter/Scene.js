import React from 'react'
import { StyleSheet, Image } from 'react-native'
import resolveAssetSource from 'resolveAssetSource'

export default class Scene extends React.Component {

  constructor(props) {
    super(props)
    this.source = require(`./../../assets/images/Chap27_part1.png`)
    this.sourceInfo = resolveAssetSource(this.source)

    const windowHeight = this.props.windowHeight

    console.log(windowHeight)

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
      <Image style={[styles.scene, this.state.styles ]} source={this.source} />
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    // flex: 1,
    resizeMode: 'cover'
  }
})
