import React from 'react'
import PropTypes from 'prop-types'
import {Image } from 'react-native'

export default class ImageAspectRatio extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.any.isRequired,
    styles: PropTypes.any
  }

  static defaultProps = {
    width: undefined,
    height: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        width: this.props.width,
        height: this.props.height
      }
    }
  }

  componentWillMount() {
    const sourceInfo = Image.resolveAssetSource(this.props.src)
    const sourceHeight = sourceInfo.height
    const sourceWidth = sourceInfo.width
    this.ratio = sourceWidth / sourceHeight

    // if (width && height) {
    //   if (height / sourceHeight < width / sourceHeight) {
    //     this.ratio = sourceWidth / sourceHeight
    //     this.setState({styles:{width: undefined}})
    //   } else {
    //     this.ratio = sourceHeight / sourceWidth
    //     this.setState({styles:{height: undefined}})
    //   }
    // }
    // else if (width) {
    //   // this.ratio = sourceHeight / sourceWidth
    // }
    // else if (height) {
    //   this.ratio = sourceWidth / sourceHeight
    // }
  }

  render () {
    return (
      <Image resizeMode='stretch' aspectRatio={this.ratio} style={[this.state.styles, this.props.styles]} source={this.props.src}/>
    )
  }
}
