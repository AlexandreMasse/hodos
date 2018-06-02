import React from 'react'
import {StyleSheet, View, Text, Image, Button, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import ButtonWhite from "../ButtonWhite";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import {LinearGradient} from "expo";
import ImageAspectRatio from "../utils/ImageAspectRatio";
import ImagesList from "../../assets/ImagesList";

class Intro extends React.Component {

  _handleButtonWhiteOnTouch = () => {
    this.props.navigation.navigate('MainDrawerNavigator')
  }

  render () {
    return (
      <View style={styles.container}>
        <LinearGradient start={[0, 0]} end={[0, 1]}
                        colors={['#00a7f5', 'rgba(255, 255, 255, 1)']} style={styles.backgroundGradient}
        />
        <LottieAnimation source={require('../../assets/animations/nuages-intro.json')} styles={styles.animationNuagesIntro}/>
        <ImageAspectRatio src={ImagesList.intro.landscape} width={'100%'} styles={styles.landscape}/>
        <LottieAnimation source={require('../../assets/animations/olympe')} styles={styles.animationOlympe}/>
        <ButtonWhite text={'Passer l\'introduction'} style={styles.button} hasImage={true} imageLeft={false} onTouch={this._handleButtonWhiteOnTouch}/>
        <LottieAnimation source={require('../../assets/animations/nuages-debut.json')} delay={200} styles={styles.animationNuagesDebut} isLoop={false}/>
      </View>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    width: windowWidth,
  },
  landscape: {
    position: 'absolute',
    bottom: 0,
    left: 0,

  },
  button: {
    width: 200,
  },
  animationNuagesDebut: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    width: windowWidth,
  },
  animationNuagesIntro: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    width: windowWidth,
  },
  animationOlympe: {
    position: 'absolute',

    top: '63%',
    left: '42%',
    height: '20%',
    width: '20%',
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
export default connect(mapStateToProps, mapDispatchToProps)(Intro)
