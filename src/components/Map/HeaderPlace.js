import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'

export default class HeaderPlace extends React.Component {

  static propTypes = {
    placeName: PropType.string,
    onHideHeader: PropType.func.isRequired
  }

  static defaultProps = {
    placeName: 'Lieu'
  }

  constructor(props) {
    super(props)
  }

  _handleHideHeader = () => {
    this.props.onHideHeader()
  }

  render () {
    return (
      <View style={[styles.headerView]}>
        <TouchableHighlight style={[styles.button, styles.buttonLeft]} onPress={this._handleHideHeader}>
          <View style={[styles.buttonWrapper]}>
            <Image source={require('./../../assets/images/white-arrow-left.png')} style={[styles.arrow, styles.arrowLeft]} />
            <Text style={[styles.text, styles.textRight]}> Retour au plan </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, styles.buttonRight]}>
          <View style={[styles.buttonWrapper]}>
            <Image source={require('./../../assets/images/white-arrow-right.png')} style={[styles.arrow, styles.arrowRight]} />
            <Text style={[styles.text, styles.textLeft]}> Reprendre la lecture </Text>
          </View>
        </TouchableHighlight>
        <Text style={[styles.placeTitle]}>{this.props.placeName.toUpperCase()}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeTitle: {
    fontSize: 34,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15
  },
  button: {
    position: 'absolute',
    bottom: 20,
  },
  buttonLeft: {
    left: 20,
  },
  buttonRight: {
    right: 20,
    bottom: 30,
  },
  buttonWrapper: {
    flex: 1,
  },
  arrow: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: 60,
    resizeMode: 'contain'
  },
  arrowLeft: {
    left: 0,
  },
  arrowRight: {
    right: 0,
  },
  text: {
    flex: 1,
    color: '#fff',
    padding: 10
  },
  textLeft: {
    marginRight: 70
  },
  textRight: {
    marginLeft: 70
  }
})
