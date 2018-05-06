import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'
import Scene from './../Chapter/Scene'
import colors from './../../assets/colors'
import resolveAssetSource from 'resolveAssetSource'

const windowHeight = Dimensions.get('window').height

import mapImage from '../../assets/images/map.png'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPlace: false,
      fadeAnim: new Animated.Value(0)
    }

  }

  render () {
    return (
      <View style={styles.container}>
        <PinchZoomView childWidth={this.getMapImageWidth()}>
            <Scene src={mapImage}/>
            <TouchableHighlight onPress={() => {this._showInfo()} } style={styles.button} underlayColor={null}>
              <View />
            </TouchableHighlight>
        </PinchZoomView>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Chapter')} style={[styles.whiteButton, styles.buttonRead]} underlayColor={'#fff'}>
            <View style={styles.whiteButtonWrapper}>
                <Text style={styles.whiteButtonText}>Reprendre la lecture</Text>
                <Image source={require('./../../assets/images/arrow-reading.png')} style={styles.arrowReading}/>
            </View>
          </TouchableHighlight>
          <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
          {this._renderPlace()}
      </View>

    )
  }

  _renderPlace () {
    if (this.state.showPlace) {
      return (
        <TouchableHighlight onPress={() => {}} style={[styles.whiteButton, styles.placeButton]} underlayColor={'#fff'}>
          <View style={styles.whiteButtonWrapper}>
              <Text style={styles.whiteButtonText}>Accéder au lieu</Text>
              <Image source={require('./../../assets/images/arrow-reading.png')} style={styles.arrowReading}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

  _renderInfo () {
    if (this.state.showInfo) {
      // return (

      // );
    }
  }

  _showInfo () {
    console.log('show info')
    this.setState({
      showPlace: !this.state.showPlace
    });
  }

  getMapImageWidth() {
    const originalSize = resolveAssetSource(mapImage)
    return (windowHeight / originalSize.height) * originalSize.width
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
  map: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    left: 650,
    top: 220,
    width: 125,
    height: 100,
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
    fontSize: 20,
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
