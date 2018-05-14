import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, View, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {fonts} from './../../assets/variables'

const windowHeight = Dimensions.get('window').height

export default class Paragraph extends React.Component {

  static propTypes = {
    text: PropType.string,
    top: PropType.string,
    left: PropType.string,
    bottom: PropType.string
  }

  static defaultProps = {
    text: 'Texte',
    top: undefined,
    left: undefined,
    bottom: undefined
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
      styles: {
        top: this.props.top ? this.props.top : undefined,
        bottom: this.props.bottom ? this.props.bottom : undefined,
        left: this.props.left
      }
    }
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim,{
        toValue: 1,
        duration: 10000
      }
    ).start()
  }

  render () {
    let { fadeAnim } = this.state
    return (
      <Animated.View style={[
        this.state.styles,
        styles.textWrapper,
        { opacity: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }) }]}
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
    fontSize: 40,
  }
})
