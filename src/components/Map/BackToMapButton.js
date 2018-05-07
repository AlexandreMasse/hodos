import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, Button, View, TouchableHighlight, Image, Text } from 'react-native'

export default class BackToMapButton extends React.Component {

  static propTypes = {
    placeName: PropType.string,
    styles: PropType.object,
    callParentHandler: PropType.func,
  }

  static defaultProps = {
    placeName: 'Lieu'
  }

  constructor(props) {
    super(props)
    console.log(this.props)
  }

  _handleCallParent = () => {
    this.props.callParentHandler()
  }

  render () {
    return (
      <TouchableHighlight style={[this.props.styles.button, styles.buttonLeft]} onPress={this._handleCallParent}>
        <View style={[this.props.styles.buttonWrapper]}>
          <Image source={require('./../../assets/images/white-arrow-left.png')} style={[this.props.styles.arrow, styles.arrowLeft]} />
          <Text style={[this.props.styles.text, styles.textRight]}> Retour au plan </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  arrowLeft: {
    left: 0,
  },
  textRight: {
    marginLeft: 70
  },
  buttonLeft: {
    left: 20,
  },
})
