import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, Button, View, TouchableHighlight, Image, Text } from 'react-native'
import imageList from '../../assets/ImagesList'

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
    console.log('BackToMapButton : props => ', this.props)
  }

  _handleCallParent = () => {
    this.props.callParentHandler()
  }

  render () {
    return (
      <TouchableOpacity style={[this.props.styles.button, styles.buttonLeft]} onPress={this._handleCallParent} activeOpacity={0.5}>
        <View style={[this.props.styles.buttonWrapper]}>
          <Image source={imageList.others.whiteArrowLeft} style={[this.props.styles.arrow, styles.arrowLeft]} />
          <Text style={[this.props.styles.text, styles.textRight]}> Retour au plan </Text>
        </View>
      </TouchableOpacity>
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
