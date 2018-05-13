import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, View, Dimensions, Text, Button, Image} from 'react-native'
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
      styles: {
        top: this.props.top ? this.props.top : undefined,
        left: this.props.left,
        bottom: this.props.bottom ? this.props.bottom : undefined
      }
    }
  }

  render () {
    return (
      <Text style={[this.state.styles, styles.text]}> {this.props.text}</Text>
    )
  }


}


const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    color: '#fff',
    fontFamily: fonts.RubikRegular,
    fontSize: 20,
    zIndex: 40
  }
})

