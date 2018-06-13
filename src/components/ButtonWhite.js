import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, TouchableOpacity, TouchableHighlight, Image, Text, View} from 'react-native'
import { colors, fonts } from './../assets/variables'
import imageList from '../assets/ImagesList'

export default class ButtonWhite extends React.Component {

  static propTypes = {
    text: PropType.string,
    iconLeft: PropType.bool,
    source: PropType.any,
    onTouch: PropType.func,
    imageStyle: PropType.any
  }

  static defaultProps = {
    text: 'Texte'
  }

  constructor(props) {
    super(props)
  }

  _handleTouch = () => {
    if (this.props.onTouch) {
      this.props.onTouch()
    }
  }

  _renderImage() {
    if (this.props.source) {
      return(
        <Image source={this.props.source} style={[
          styles.buttonImage,
          this.props.imageStyle ? this.props.imageStyle : '',
          this.props.iconLeft ? styles.iconLeft : styles.iconRight
        ]} />
      )
    }
  }

  _renderText() {
    if (this.props.source) {
      return(
        <Text style={[
          styles.buttonText,
          this.props.iconLeft ? styles.buttonLeft : styles.buttonRight
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
      <TouchableHighlight onPress={() => this._handleTouch()} activeOpacity={0.3} underlayColor={'#fefefe'} style={styles.button}>
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
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  buttonWrapper: {
    justifyContent: 'center'
  },
  buttonImage: {
    position: 'absolute',
    top: 10,
    width: 20,
    height: 30,
    resizeMode: 'contain',
  },
  iconRight: {
    right: 18,
  },
  iconLeft: {
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
