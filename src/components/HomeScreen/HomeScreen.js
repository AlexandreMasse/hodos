import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, Button } from 'react-native'
import {connect} from 'react-redux';
import storageSessionManager from './../../store/StorageSessionManager'
import StorageSessionManager from './../../store/StorageSessionManager'
import Animation from '../Animation/Animation'
import ButtonWhite from './../ButtonWhite'

class HomeScreen extends React.Component {

  _handleNavigationToMap() {
    this.props.navigation.navigate('Intro')
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/splash/splash.png')} style={styles.splashImage} />
        <View style={styles.buttonContainer} >
          <ButtonWhite text={'Commencer l\'aventure'}  style={styles.button} hasImage={true} imageLeft={false} onTouch={this._handleNavigationToMap} />
        </View>
        <View style={styles.buttonStorage} >
          <Button title="empty Local Storage" onPress={ () => StorageSessionManager.clearStorage()} />
          <Button title="get Data from API" onPress={ () => {
            StorageSessionManager.getDataFromApi()
          } } />
        </View>
        {/*<View style={styles.animationContainer}>*/}
          {/*<Animation/>*/}
        {/*</View>*/}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "white",
  },
  buttonContainer: {
    height: 60,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: '65%',
    justifyContent: 'center',
  },
  button: {
    width: 200,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30
  },
  buttonStorage: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flex: 1,
  },
  animationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flex: 1,
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
