import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showReadBtn: false,
      fadeAnim: new Animated.Value(0)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <PinchZoomView>
          <View style={styles.container}>
            <Image source={require('./../../assets/images/map.png')} style={styles.map} />
            <TouchableHighlight onPress={() => {this._toggleReadBtn()} } style={styles.button}>
              <View />
            </TouchableHighlight>
            <Text style={styles.text}>Map</Text>
            <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
            {this._renderReadBtn()}
          </View>
        </PinchZoomView>
      </View>

    )
  }

  _renderReadBtn () {
    if (this.state.showReadBtn) {
      return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Chapter')} style={styles.buttonRead}>
          <Text style={styles.buttonReadText}>Reprendre la lecture</Text>
        </TouchableHighlight>
      );
    }
  }

  _toggleReadBtn () {
    this.setState({
      showReadBtn: !this.state.showReadBtn
    });
  }


}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    left: 170,
    top: 150,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(127, 63, 191, 0.36)',
  },
  buttonRead: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    width: 400,
    transform: [{translateX:  -200}],
    backgroundColor: '#8cd7ff',
    borderColor: '#8cd7ff',
    borderRadius: 50,
    borderWidth: 5,
  },
  buttonReadText: {
    color: '#fff',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
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
