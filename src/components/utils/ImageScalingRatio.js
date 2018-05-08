import React from 'react'
import PropTypes from 'prop-types'
import {Image} from 'react-native'

export default class ImageScalingRatio extends React.Component {

  static propTypes = {
    scalingRatio: PropTypes.number.isRequired,
    src: PropTypes.any.isRequired,
    styles: PropTypes.any
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        width: 0,
        height: 0
      }
    }
  }

  componentWillMount() {
    const sourceInfo = Image.resolveAssetSource(this.props.src)
    this.sourceHeight = sourceInfo.height
    this.sourceWidth = sourceInfo.width

    this.setState({
      styles: {
        width: this.sourceWidth * this.props.scalingRatio,
        height: this.sourceHeight * this.props.scalingRatio
      }
    })
  }

  render () {
    return (
      <Image style={[this.state.styles, this.props.styles]} source={this.props.src}/>
    )
  }
}
