import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'
import Scene from './../Chapter/Scene'
import {colors} from '../../assets/variables'
import resolveAssetSource from 'resolveAssetSource'
import mapData from './../../store/datas/map.json'
import mapImage from './../../assets/images/map/map.png'
import HeaderPlace from './HeaderPlace'
import ButtonWhite from './../ButtonWhite'
import Place from './../Place/Place'

const windowHeight = Dimensions.get('window').height


class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPlace: false,
      showPlaceInfo: false,
      showReadingButton: true,
      activePlace: {
        id: '',
        name: ''
      },
      fadeAnim: new Animated.Value(0)
    }

  }

  _handleReading = () => {
    this.props.navigation.navigate('Previously')
  }

  _handleNavigationPlace = () => {
    this.setState({
      showPlaceInfo: true,
      showPlace: false
    })
  }

  _handleBackToMap = () => {
    this.setState({
      showPlaceInfo: false,
      showPlace: true
    })
  }

  _renderPlaceInfo() {
    console.log('Map : state showPlaceInfo => ', this.state.showPlaceInfo)
    if (this.state.showPlaceInfo) {
      console.log('Map: showPlaceInfo (true) => is shown');
      return(
        <Place place={this.state.activePlace} onBackToMap={this._handleBackToMap} onReading={this._handleReading} style={styles.placeInfo} />
      )
    }
  }

  _renderReadingButton() {
    if (this.state.showReadingButton) {
      return (
        <View  style={styles.buttonRead} src={require('./../../assets/images/arrow-right.png')}>
          <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={this._handleReading} />
        </View>
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
        <View style={styles.placeButton} src={require('./../../assets/images/arrow-right.png')}>
          <ButtonWhite text={'Accéder au lieu'} hasImage={true} imageLeft={false} onTouch={this._handleNavigationPlace} />
        </View>
      );
    }
  }

  _renderHeader () {
    if (this.state.showPlace) {
      return (
        <HeaderPlace placeName={this.state.activePlace.name} onHideHeader={this._hideHeader} onNavigateChapter={this._navigateChapter} />
      )
    }
  }

  _navigateChapter = () => {
    this.props.navigation.navigate('Previously')
  }

  _showHeader = (mapPlace) => {
    var place = {}
    const id = mapPlace.id

    // console.log(this.props.placeList)
    this.props.placeList.map(val => {
      if (val.id == id) {
        place = val;
      }
    })

    this.setState({
      showPlace: true,
      showReadingButton: false,
      activePlace: place
    })

    // console.log(place)
  }

  _hideHeader = () => {
    this.setState({
      showPlace: false,
      showPlaceInfo: false,
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
        <PinchZoomView initialScale={2.5} minScale={2} maxScale={3.5} childHeight={windowHeight} childWidth={this.getMapImageWidth()}>
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
        {this._renderPlaceInfo()}
      </View>

    )
  }
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    backgroundColor: 'transparent',
  },
  buttonRead: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  placeButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{'translateX': -100}]
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
    textAlign: 'left',
    fontFamily: 'rubik-light'
  },
  arrowReading: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 50,
    height: 20,
    resizeMode: 'contain',
  },
  placeInfo: {
    position: 'absolute',
    zIndex: 40,
    width: 700,
    height: 400,
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    placeList: state.placeList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
