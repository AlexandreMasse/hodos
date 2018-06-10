import React from 'react'
import PropTypes from 'prop-types'
import {Animated, View} from 'react-native'
import { AudioManager } from '../utils/AudioManager'

export default class Audio extends React.Component {

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    scrollX: PropTypes.any.isRequired,
    range: PropTypes.any.isRequired,
    source: PropTypes.any.isRequired,
    parentWidth: PropTypes.any.isRequired,
    maxVolume: PropTypes.number,
    loopDelay: PropTypes.number
  }

  static defaultProps = {
    range: [0, 1000],
    loopDelay: 10000,
    maxVolume: 1
  }

  constructor(props) {
    super(props)
    this.state = {
      parentWidth: 0,
      isLoaded: false,
      time: 0
    }
  }

  componentWillUnmount() {
    if (this.audio) {
      AudioManager.stopSound(this.audio)
    }
  }
  componentWillMount() {
    AudioManager.prepareSound(this.props.source, {
      volume: 0,
      time: 0
    }).then((data) => {
      AudioManager.playSound(data)
      this.audio = data
      this.setState({
        isLoaded: true
      })
    })

    this.props.scrollX.addListener(({value}) => {
      const now = Date.now()
      if (this.state.isLoaded
        && value > this.state.percentRange[0]
        && value < this.state.percentRange[1]
        && (now - this.state.time >= this.props.loopDelay))
      {
        this.setState({
          time: now
        })
        AudioManager.setVolume(this.audio, this.props.maxVolume).then(() => {
          AudioManager.playSound(this.audio)
        })

      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parentWidth: nextProps.parentWidth,
      percentRange: this.props.range.map((val) => (val / 100) * this.props.parentWidth)
    })
  }
  render() {
    return(
      null
    )
  }
}
