import React from 'react'
import PropTypes from 'prop-types'
import {Animated} from 'react-native'
import { AudioManager } from '../utils/AudioManager'

const textsApparitions = [8800, 6500, 4500]

export default class Audio extends React.Component {

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
      isLoaded: false
    }
    // this.audio = []
  }

  componentWillMount() {

    this.scrollXAnimated = new Animated.Value(0)

    AudioManager.prepareSound(this.props.source).then((data) => {
      this.setState({
        audio: data,
        isLoaded: true
      })
      console.log('sound loaded !')
      AudioManager.playSound(data)
    })

    this.props.scrollX.addListener(({value}) => {
      Animated.timing(this.scrollXAnimated, {
        toValue: value,
        duration: 1
      }).start()
      // this.setState({
      //   scrollXAnimated: value
      // })
    })
  }

  componentWillUpdate() {
    if (this.state.isLoaded) {
      const volumeOutput = this.scrollXAnimated.interpolate({
        inputRange: this.props.volumeInputRange,
        outputRange: this.props.volumeOutputRange,
        extrapolate: 'clamp',
      }).__getValue()


      // if(volumeOutput < 1 && volumeOutput > 0) {
        AudioManager.setVolume(this.state.audio, volumeOutput)
      // }
    }
  }

  render() {
    return(null)
  }
}
