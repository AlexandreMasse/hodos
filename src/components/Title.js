import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Text, View, Animated} from 'react-native'
import { colors, fonts, stylesSheet } from './../assets/variables'
import { LinearGradient } from 'expo'

export default class Title extends React.Component {

  static propTypes = {
    title: PropType.string,
    subTitle: PropType.string,
    willUpdate: PropType.bool
  }

  static defaultProps = {
    title: 'Titre',
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      subTitle: this.props.subTitle
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(100)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.state.title && this.props.willUpdate) {
      Animated.timing(this._visibility, {
        toValue: 0,
        duration: 300,
      }).start(this._handleShowUpdate)
    } else {
      this._updateState()
    }
  }

  _updateState = () => {
    this.setState({
      title: this.props.title,
      subTitle: this.props.subTitle
    })
  }

  _handleShowUpdate = () => {
    this._updateState()
    Animated.timing(this._visibility, {
      toValue: 100,
      duration: 300,
    }).start()
  }

  render () {
    return (
      <View style={styles.titleContainer}>
        <LinearGradient start={[0, 0]} end={[1, 0]}
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']} style={styles.line} />
        <Animated.View style={[
          { opacity: this.props.willUpdate ? this._visibility.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1]
          }) : 1 }
        ]}>
          <Text style={stylesSheet.title}>{this.state.title}</Text>
          <Text style={stylesSheet.subTitle}>{this.state.subTitle}</Text>
        </Animated.View>
        <LinearGradient start={[0, 0]} end={[1, 0]}
        colors={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.3)']} style={styles.line} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  line: {
    width: '45%',
    height: 1
  }
})
