import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, TouchableHighlight, Image, Text, View} from 'react-native'
import { colors, fonts } from './../assets/variables'

export default class ButtonWhite extends React.Component {

  static propTypes = {
    text: PropType.string,
    imageLeft: PropType.bool,
    hasImage: PropType.bool,
    onTouch: PropType.func
  }

  static defaultProps = {
    text: 'Texte'
  }

  constructor(props) {
    super(props)
  }

  _handleTouch = () => {
    this.props.onTouch()
  }

  _renderImage() {
    if (this.props.hasImage) {
      return(
        <Image source={this.props.imageLeft ? require('./../assets/images/arrow-left.png') : require('./../assets/images/arrow-right.png')} style={[
          styles.buttonImage,
          this.props.imageLeft ? styles.imageLeft : styles.imageRight
        ]} />
      )
    }
  }

  _renderText() {
    if (this.props.hasImage) {
      return(
        <Text style={[
          styles.buttonText,
          this.props.imageLeft ? styles.buttonLeft : styles.buttonRight
        ]}>{this.props.text}</Text>
      )
    } else {
      return(
        <Text style={[
          styles.buttonText
        ]}>{this.props.text}</Text>
      )
    }
  }
  render () {
    return (
      <TouchableHighlight onPress={ () => this._handleTouch()} underlayColor={'white'} style={styles.button}>
        <View style={styles.wrapper}>
          {this._renderImage()}
          {this._renderText()}
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#b3afbe',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  buttonWrapper: {
    justifyContent: 'center'
  },
  buttonImage: {
    position: 'absolute',
    top: 10,
    width: 15,
    resizeMode: 'contain',
  },
  imageRight: {
    right: 18,
  },
  imageLeft: {
    left: 18,
  },
  buttonText: {
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40
  },
  buttonLeft: {
    paddingLeft: 50
  },
  buttonRight: {
    paddingRight: 50
  }
})
