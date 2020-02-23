import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
// import {fonts, colors} from './../assets/variables'

class ProgressBar extends React.Component {

  static propTypes = {
    progress: PropTypes.number.isRequired,
    nbSteps: PropTypes.number.isRequired,
    height: PropTypes.number,
    width: PropTypes.any,
    isHorizontal: PropTypes.bool,
    isReversed: PropTypes.bool,
    animationDelay: PropTypes.number,
    animationDuration: PropTypes.number,
    unfilledColor: PropTypes.string,
    beginGradientColor: PropTypes.string,
    endGradientColor: PropTypes.string,
  }

  static defaultProps = {
    height: 3,
    width: 400,
    isHorizontal: false,
    isReversed: false,
    animationDelay: 0,
    animationDuration: 700,
    unFilledColor: '#eaeaea',
    beginGradientColor: '#08abf6',
    endGradientColor: '#85f1fe'
  }

  constructor (props) {
    super(props)
    this._progression = new Animated.Value(0)
    const size = this.props.isHorizontal ? this.props.width : this.props.height
    this.state = {
      size: size,
      progressWidth: this.props.progress * (size / this.props.nbSteps)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progressWidth: nextProps.progress * this.state.size / this.props.nbSteps
    })
  }

  componentDidMount() {
    Animated.timing(this._progression, {
      toValue: 100,
      duration: this.props.animationDuration,
      delay: this.props.animationDelay
    }).start()
  }

  _handleCircularProgressRef = (el) => {
    if(this.el) return;
    this.el = el;
    const {currentSkill, totalSkill, animationDelay, animationDuration} = this.props
    const progress = Math.round(currentSkill/ totalSkill * 100)
  }

  render() {
    const {img, size, currentSkill, totalSkill, width} = this.props
    const progressionInterpolation = this._progression.interpolate({
      inputRange: [0, 100],
      outputRange: [0, this.state.progressWidth],
    })

    return (
      <View style={[styles.barWrapper, {width: this.props.width, height: this.props.height,
        justifyContent: this.props.isReversed ? 'flex-end' : 'flex-start' }]}>
        <Animated.View style={[
          styles.progressWraper,
          {
            width: this.props.isHorizontal ?
            progressionInterpolation : this.props.width,
            height: this.props.isHorizontal ?  this.props.height : progressionInterpolation,
          }
        ]}>
          <LinearGradient start={[0, 1]} end={[this.props.isHorizontal ? 1 : 0, this.props.isHorizontal ? 1 : 0]} colors={[this.props.beginGradientColor, this.props.endGradientColor]} style={{width:  '100%', height:'100%', borderRadius: 10}}/>
        </ Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  barWrapper: {
    backgroundColor: '#eaeaea',
    borderRadius: 10
  },
  progressWraper: {
    height: '100%',
    width: '100%',
  }
})

export default ProgressBar
