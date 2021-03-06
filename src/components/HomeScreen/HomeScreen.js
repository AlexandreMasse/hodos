import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, Image, Button } from 'react-native'
import {connect} from 'react-redux';
import StorageSessionManager from './../../store/StorageSessionManager'
import ButtonWhite from './../ButtonWhite'
import imageList from './../../assets/ImagesList'

class HomeScreen extends React.Component {

  _handleButtonWhiteOnTouch = () => {
    this.props.navigation.navigate('Intro')
  }

  componentWillUnmount() {
    console.log('home screen unmount')
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/splash/splash.png')} style={styles.splashImage} />
        <View style={styles.buttonContainer} >
          <ButtonWhite text={'Commencer l\'aventure'}  style={styles.button} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleButtonWhiteOnTouch} />
        </View>
        <TouchableOpacity style={{position: 'absolute', left: 0, top:0, width: 150, height: 150}} onPress={ () => {
              StorageSessionManager.getDataFromApi(26)
        }} />
        <TouchableOpacity style={{position: 'absolute', right: 0, top:0, width: 150, height: 150}} onPress={ () => {
            StorageSessionManager.getDataFromApi(67)
        }} />
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
    placeList: state.placeList,
    chapterList: state.chapterList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
