import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Text, Animated} from 'react-native'
import { colors, fonts } from './../assets/variables'

const increaseValue = 100

export default class TextApparition extends React.Component {

  static propTypes = {
    texts: PropType.array.isRequired,
    durations: PropType.array.isRequired,
    delay: PropType.number,
    startDelay: PropType.number,
    start: PropType.bool,
    styles: PropType.any,
    onAnimationEnd: PropType.func,
    restartAnimationCount: PropType.number
  }

  static defaultProps = {
    delay: 0,
    startDelay: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      subTitle: this.props.subTitle,
      // restartAnimationCount: 0,
      stopAnimation: false
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0)
    this._parentVisibility = new Animated.Value(100)
    this.ranges = []
    this.props.texts.forEach( (text, index) => {
      this.ranges.push(increaseValue * (index + 1))
    })
    this.handleAnimation(increaseValue, this.props.durations, 0, this.props.texts.length)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restartAnimationCount !== this.props.restartAnimationCount
      && nextProps.restartAnimationCount > 0) {
      this._handleRestart()
    }
  }

  _handleRestart() {
    this._visibility = new Animated.Value(0)
    Animated.timing(this._parentVisibility, {
      toValue: 0,
      duration:  1000,
    }).start( () => {
      Animated.timing(this._visibility, {
        toValue: 0,
        duration:  10,
      }).start( () => {
        Animated.timing(this._parentVisibility, {
          toValue: 100,
          duration:  1000,
        }).start( () => {
          this.setState({stopAnimation: false})
          this.handleAnimation(increaseValue, this.props.durations, 0, this.props.texts.length)
        })
      })
    })
  }

  handleAnimation (value, durations, index, nb) {
    value = index === nb - 1 ? value - increaseValue * 0.09 : value
    Animated.timing(this._visibility, {
      toValue: value,
      duration: durations[index],
      delay: this.props.delay + (index === 0 ? this.props.startDelay : 0),
    }).start(() => {
      if (!this.state.stopAnimation) {
        if (index < nb - 1) {
          this.handleAnimation((value + increaseValue), durations, (index + 1), nb)
        } else {
          if (this.props.onAnimationEnd) {
            this.props.onAnimationEnd()
          }
        }
      }
    })
  }

  _renderTexts() {
    return this.props.texts.map((text, i) => {
      return (
        <Animated.View style={[
          { opacity: this._visibility.interpolate({
            inputRange: [(this.ranges[i] - increaseValue), (this.ranges[i] - increaseValue * 0.9), (this.ranges[i]- increaseValue * 0.1), (this.ranges[i])],
            outputRange: [0, 1, 1, 0]
          })},
          {
            width: '100%',
            alignItems: 'center'
          }
        ]} key={i}>
          <Text style={[styles.text, this.props.styles]}>{text}</Text>
        </Animated.View>
      )
    })
  }

  render () {
    return (
      <Animated.View style={[
        styles.textContainer,
        { opacity: this._parentVisibility.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1]
        })},]}>
        {this._renderTexts()}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    flex: 1,
    fontFamily: fonts.RubikRegular
  }
})
