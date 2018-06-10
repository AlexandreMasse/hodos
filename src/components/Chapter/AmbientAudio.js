import React from 'react'
import PropTypes from 'prop-types'
import {Animated, View} from 'react-native'
import { AudioManager } from '../utils/AudioManager'

export default class AmbientAudio extends React.Component {

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    scrollX: PropTypes.any.isRequired,
    volumeInputRange: PropTypes.any.isRequired,
    volumeOutputRange: PropTypes.any.isRequired,
    source: PropTypes.any.isRequired,
    parentWidth: PropTypes.any.isRequired,
    startX: PropTypes.number
  }

  static defaultProps = {
    volumeInputRange: [0, 1000],
    volumeOutputRange: [0, 1]
  }

  constructor(props) {
    super(props)
    this.state = {
      audio:[],
      isLoaded: false,
    }
  }

  componentWillUnmount() {
    if (this.state.audio) {
      AudioManager.stopSound(this.state.audio)
    }
  }

  componentWillMount() {

    //this.scrollXAnimated = new Animated.Value(0)

    AudioManager.prepareSound(this.props.source, {
      isLooping: true
    }).then((data) => {
      this.setState({
        audio: data,
        lastVolume: 0.1,
        isLoaded: true
      })
      console.log('sound loaded !')
      AudioManager.playSound(data)
    })

    this.props.scrollX.addListener(({value}) => {

      if (this.state.isLoaded) {
        const volumeOutput = this.props.scrollX.interpolate({
        inputRange: this.props.volumeInputRange.map((val) => (val / 100) * this.props.parentWidth),
        outputRange: this.props.volumeOutputRange,
       extrapolate: 'clamp'
      }).__getValue()

      //console.log(volumeOutput)


      // if ( Math.abs(this.state.lastVolume - volumeOutput) >= 0.2) {
      //   this.setState({
      //     lastVolume: volumeOutput
      //   })

        AudioManager.setVolume(this.state.audio, volumeOutput)
      // }
    }



    })
  }

  render() {
    return(
      null
    )
  }
}
