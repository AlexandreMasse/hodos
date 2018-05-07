import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import BackToMapButton from './BackToMapButton'
import { fonts } from './../../assets/variables'

export default class HeaderPlace extends React.Component {

  static propTypes = {
    placeName: PropType.string,
    onHideHeader: PropType.func.isRequired,
    onNavigateChapter: PropType.func
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

  _handleNavigateChapter = () => {
    this.props.onNavigateChapter()
  }

  _renderRightElement() {
    if (this.props.onNavigateChapter) {
      return (
        <TouchableHighlight style={[styles.button, styles.buttonRight]} onPress={this._handleNavigateChapter} underlayColor={'transparent'}>
          <View style={[styles.buttonWrapper]}>
            <Image source={require('./../../assets/images/white-arrow-right.png')} style={[styles.arrow, styles.arrowRight]} />
            <Text style={[styles.text, styles.textLeft]}> Reprendre la lecture </Text>
          </View>
        </TouchableHighlight>
      )
    } else {
      return <Image source={require('./../../assets/images/logo.png')} style={[styles.imageRight]}/>
    }
  }

  render () {
    return (
      <View style={[styles.headerView]}>
        <BackToMapButton styles={{button: styles.button, buttonWrapper: styles.buttonWrapper, text: styles.text, arrow: styles.arrow}} callParentHandler={this._handleHideHeader} />
        {this._renderRightElement()}
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
    textShadowRadius: 15,
    fontFamily: fonts.RubikBold,
  },
  button: {
    position: 'absolute',
    bottom: 20,
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
  imageRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 70,
  }
})
