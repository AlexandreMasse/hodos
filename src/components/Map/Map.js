import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'
import Scene from './../Chapter/Scene'
import colors from './../../assets/colors'
import resolveAssetSource from 'resolveAssetSource'
import mapData from './../../store/datas/map.json'
import mapImage from './../../assets/images/map/map.png'
import HeaderPlace from './HeaderPlace'

const windowHeight = Dimensions.get('window').height


class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPlace: false,
      showReadingButton: true,
      activePlace: {
        id: '',
        name: ''
      },
      fadeAnim: new Animated.Value(0)
    }

  }

  _renderReadingButton() {
    if (this.state.showReadingButton) {
      return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Chapter')} style={[styles.whiteButton, styles.buttonRead]} underlayColor={'#fff'}>
            <View style={styles.whiteButtonWrapper}>
                <Text style={styles.whiteButtonText}>Reprendre la lecture</Text>
                <Image source={require('./../../assets/images/green-arrow-right.png')} style={styles.arrowReading}/>
            </View>
          </TouchableHighlight>
      );
    }
  }

  _renderTouchablePlace() {
      return mapData.map((mapPlace, index) => {
        return(
          <TouchableHighlight
            key={'map_'+index}
            onPress={() => {this._showHeader(mapPlace)} }
            style={[styles.button, {top: mapPlace.y, left: mapPlace.x, width: mapPlace.width, height: mapPlace.height}]}
            underlayColor={null}>
            <View />
          </TouchableHighlight>
        )
      })
  }

  _renderPlace () {
    if (this.state.showPlace) {
      return (
        <TouchableHighlight onPress={() => {}} style={[styles.whiteButton, styles.placeButton]} underlayColor={'#fff'}>
          <View style={styles.whiteButtonWrapper}>
              <Text style={styles.whiteButtonText}>Accéder au lieu</Text>
              <Image source={require('./../../assets/images/green-arrow-right.png')} style={styles.arrowReading}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

  _renderHeader () {
    if (this.state.showPlace) {
      return (
        <HeaderPlace placeName={this.state.activePlace.name} onHideHeader={this._hideHeader} />
      )
    }
  }

  _showHeader (mapPlace) {
    this.setState({
      showPlace: true,
      showReadingButton: false,
      activePlace: {
        id: '',
        name: mapPlace.name
      }
    })
  }

  _hideHeader = () => {
    this.setState({
      showPlace: false,
      showReadingButton: true
    })
  }

  getMapImageWidth() {
    const originalSize = resolveAssetSource(mapImage)
    return (windowHeight / originalSize.height) * originalSize.width
  }

  render () {
    return (
      <View style={styles.container}>
        <PinchZoomView childWidth={this.getMapImageWidth()}>
          <Scene src={mapImage}/>
          <TouchableHighlight style={styles.mapTouchable} onPress={() => this._hideHeader()}  underlayColor={'transparent'}>
            <View />
          </TouchableHighlight>
          { this._renderTouchablePlace() }
        </PinchZoomView>
          {this._renderReadingButton()}
        <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
        {this._renderPlace()}
        {this._renderHeader()}
      </View>

    )
  }
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleGreen
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  mapTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(127, 63, 191, 0.36)',
  },
  buttonRead: {
    position: 'absolute',
    top: 50,
    right: 15,
    width: 300,
  },
  placeButton: {
    position: 'absolute',
    bottom: 50,
    width: 250,
    left: '50%',
    transform: [{'translateX': -125}]
  },
  whiteButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#38373b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  whiteButtonWrapper: {
    flex: 1,
  },
  whiteButtonText: {
    color: colors.paleGreen,
    fontSize: 24,
    padding: 15,
    textAlign: 'left'
  },
  arrowReading: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 50,
    height: 20,
    resizeMode: 'contain',
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
