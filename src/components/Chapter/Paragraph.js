import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, View, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {fonts} from './../../assets/variables'

const windowHeight = Dimensions.get('window').height

export default class Paragraph extends React.Component {

  static propTypes = {
    text: PropType.string.isRequired,
    top: PropType.string,
    left: PropType.number.isRequired,
    width: PropType.number.isRequired,
    bottom: PropType.string,
    scrollX: PropType.any.isRequired,
    parentWidth: PropType.number.isRequired,
    animationOpacityValues: PropType.array
  }

  static defaultProps = {
    top: undefined,
    bottom: undefined,
    width: 100,
    animationOpacityValues: [0.9, 0.7, 0.3, 0.1, 1]
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        width: this.props.width,
        top: this.props.top ? this.props.top : undefined,
        bottom: this.props.bottom ? this.props.bottom : undefined,
        left: this.props.left * this.props.parentWidth
      }
    }
  }

  _ParagraphView(el) {
    this.el = el
  }

  componentWillReceiveProps (nextProp) {

    if (this.props.parentWidth !== nextProp.parentWidth) {
      this.setState({
        styles: {
          ...this.state.styles,
          left: nextProp.left * nextProp.parentWidth
        }
      })
    }
  }

  render () {
    const { animationOpacityValues, windowWidth } = this.props
    const { left } = this.state.styles
    const middle = left + (this.state.styles.width / 2)

    return (
      <Animated.View ref={this._ParagraphView()} style={[
        this.state.styles,
        styles.textWrapper,
        { opacity: this.props.scrollX.interpolate({
          inputRange: [
            middle - windowWidth,
            middle - windowWidth * animationOpacityValues[0],
            middle - windowWidth * animationOpacityValues[1],
            middle - windowWidth * animationOpacityValues[2],
            middle - windowWidth * animationOpacityValues[3],
            middle + windowWidth * animationOpacityValues[4],
          ],
          outputRange: [0, 0, 1, 1, 0, 0]
        }) }
      ]}
        >
        <Text style={styles.text}> {this.props.text}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    position: 'absolute',
    zIndex: 40
  },
  text: {
    color: '#fff',
    fontFamily: fonts.RubikRegular,
    fontSize: 22,
  }
})
