import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Animated, Text, Easing} from 'react-native'
import { LinearGradient } from 'expo'
import {fonts, colors} from '../../assets/variables'

class ProgressBar extends React.Component {

  static propTypes = {
    activeStep: PropTypes.number.isRequired,
    nbSteps: PropTypes.number.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    isHorizontal: PropTypes.bool,
    animationDelay: PropTypes.number,
    animationDuration: PropTypes.number
  }

  static defaultProps = {
    height: 3,
    width: 400,
    isHorizontal: true,
    animationDelay: 0,
    animationDuration: 700,
  }

  constructor (props) {
    super(props)
    this._progression = new Animated.Value(0)

    const size = this.isHorizontal ? this.props.width : this.props.height
    this.state = {
      size: size,
      progressWidth: this.props.activeStep * size / this.props.nbSteps
    }
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      progressWidth: nextProps.activeStep * this.state.size / this.props.nbSteps
    })

    Animated.timing(this._progression, {
      toValue: nextProps.showChapterEnd ? 100 : 0,
      duration: this.props.animationDuration,
      delay: this.props.animationDelay
    }).start()
  }

  _handleCircularProgressRef = (el) => {
    if(this.el) return;
    this.el = el;
    const {currentSkill, totalSkill, animationDelay, animationDuration} = this.props;
    const progress = Math.round(currentSkill/ totalSkill * 100)
  }

  render() {
    const {img, size, currentSkill, totalSkill, width} = this.props

    return (
      <Animated.View style={[styles.barWrapper, {width: this.props.width, height: this.props.height}]}>
        <View style={[{width: this.state.progressWidth}]}></View>
        <View></View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  barWrapper: {
    backgroundColor: '#eaeaea',
    borderRadius: 10
  }
})


export default CircularSkill
