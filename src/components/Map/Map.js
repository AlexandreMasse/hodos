import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'
import Scene from './../Chapter/Scene'
import colors from './../../assets/colors'


const height = Dimensions.get('window').height

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      fadeAnim: new Animated.Value(0)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <PinchZoomView>
          <View style={styles.container}>
            <Scene src={require('./../../assets/images/map.png')} windowHeight={height}/>
            <TouchableHighlight onPress={() => {this._showInfo()} } style={styles.button}>
              <View />
            </TouchableHighlight>
          </View>
        </PinchZoomView>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Chapter')} style={styles.buttonRead}>
            <View style={styles.buttonReadWrapper}>
                <Text style={styles.buttonReadText}>Reprendre la lecture</Text>
                <Image source={require('./../../assets/images/arrow-reading.png')} style={styles.arrowReading}/>
            </View>
          </TouchableHighlight>
          <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
          {this._renderInfo()}
      </View>

    )
  }

  _renderInfo () {
    if (this.state.showInfo) {
      // return (

      // );
    }
  }

  _showInfo () {
    this.setState({
      showReadBtn: !this.state.showInfo
    });
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
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#38373b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonReadWrapper: {
    flex: 1,
  },
  buttonReadText: {
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
