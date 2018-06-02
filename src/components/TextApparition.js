import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Text, View, Animated} from 'react-native'
import { colors, fonts, stylesSheet } from './../assets/variables'
import { LinearGradient } from 'expo'

const increaseValue = 100

export default class Title extends React.Component {

  static propTypes = {
    texts: PropType.array.isRequired,
    durations: PropType.array.isRequired,
    delay: PropType.number,
    start: PropType.bool,
    styles: PropType.object
  }

  static defaultProps = {
    duration: 5000,
    delay: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      subTitle: this.props.subTitle
    }
  }

  handleAnimation (value, durations, index, nb) {
    Animated.timing(this._visibility, {
      toValue: value,
      duration: durations[index],
      delay: this.props.delay
    }).start(() => {
      if (index < nb) {
        this.handleAnimation((value + increaseValue), durations, (index + 1), nb)
      }
    })
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0)
    this.ranges = []
    this.props.texts.forEach( (text, index) => {
      this.ranges.push(increaseValue * (index + 1))
    })
    this.handleAnimation(increaseValue, this.props.durations, 0, this.props.texts.length)
  }

  componentWillReceiveProps(nextProps) {

  }

  _renderTexts() {
    return this.props.texts.map((text, i) => {
      return (
        <Animated.View style={[
          { opacity: this._visibility.interpolate({
            inputRange: [(this.ranges[i] - increaseValue), (this.ranges[i] - increaseValue * 0.9), (this.ranges[i]- increaseValue * 0.1), (this.ranges[i])],
            outputRange: [0, 1, 1, 0]
          })}
        ]} key={i}>
          <Text style={[styles.text, this.props.styles]}>{text}</Text>
        </Animated.View>
      )
    })
  }

  render () {
    return (
      <View style={styles.textContainer}>
        {this._renderTexts()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'yellow'
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    left: 0,
  }
})
