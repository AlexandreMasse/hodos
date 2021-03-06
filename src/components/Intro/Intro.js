import React from 'react'
import {StyleSheet, View, Dimensions, Animated} from 'react-native'
import {connect} from 'react-redux';
import ButtonWhite from "../ButtonWhite";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import { LinearGradient } from 'expo-linear-gradient';
import ImageAspectRatio from "../utils/ImageAspectRatio";
import ImagesList from "../../assets/ImagesList";
import TextApparition from "./../TextApparition"
import { AudioManager} from '../utils/AudioManager'
import SoundsList from './../../assets/SoundsList'

const textsApparitions = [8800, 6500, 4500]

class Intro extends React.Component {

  constructor(props) {
    super(props)
    this.audio = {}
    this.texts = [
      'Il y a fort longtemps, sur les terres lointaines de la Grèce antique, régna l’âge d’or des dieux tout-puissants et d’extraordinaires héros.',
      'Nous allons découvrir l’histoire de l’un d’entre eux, au travers d’une aventure à mille et un rebondissements,',
      'celle d’Hermès, jeune dieu curieux et courageux.'
    ]

    this.audioTimeOut = []

    this.state = {
      buttonOpacity: new Animated.Value(0),
      audioLoaded: false
    }
    AudioManager.prepareSounds(SoundsList.intro, {
      volume: 1
    }).then((data) => {
      this.audio = data
      this.setState({audioLoaded: true})
      this.audio.play.background()
      AudioManager.setVolume(this.audio.sound.background, 0.1)
      AudioManager.setVolume(this.audio.sound.phrase1, 0.6)
      AudioManager.setVolume(this.audio.sound.phrase2, 0.6)
      AudioManager.setVolume(this.audio.sound.phrase3, 0.6)
      this.audioTimeOut.push(
        setTimeout(() => {
          this.audio.play.phrase1()
        }, 2100),
        setTimeout(() => {
          this.audio.play.phrase2()
        }, 13000),
        setTimeout(() => {
          this.audio.play.phrase3()
        }, 21100)
      )
    })
  }

  _handleButtonWhiteOnTouch = () => {
    this.props.navigation.navigate('MainDrawerNavigator')
    if (this.audio) {
      this.audioTimeOut.map(timeout => {
        clearTimeout(timeout)
      })
      AudioManager.stopSounds(this.audio.sound)
    }
  }

  componentWillUnmount() {
    console.log('INTRO unmount')
  }

  componentDidMount() {
    Animated.timing(this.state.buttonOpacity, {
      toValue: 1,
      delay: 4000,
      duration: 700
    }).start()
  }

  render () {
    return (
      <View style={styles.container}>
        {/* Background Gradient*/}
        <LinearGradient start={[0, 0]} end={[0, 1]}
                        colors={['#00a7f5', 'rgba(255, 255, 255, 1)']} style={styles.backgroundGradient}
        />
        {/* Animations */}
        <LottieAnimation source={require('../../assets/animations/intro/nuages-intro.json')} styles={styles.animationNuagesIntro}/>
        <ImageAspectRatio src={ImagesList.intro.landscape} width={'100%'} styles={styles.landscape}/>
        <LottieAnimation source={require('../../assets/animations/intro/cascade-intro')} styles={styles.animationCascade}/>
        <LottieAnimation source={require('../../assets/animations/intro/olympe')} styles={styles.animationOlympe}/>

        <LottieAnimation source={require('../../assets/animations/intro/bulles')} styles={styles.animationBulles1}/>
        <LottieAnimation source={require('../../assets/animations/intro/bullesV2')} styles={styles.animationBulles2}/>
        <LottieAnimation source={require('../../assets/animations/intro/bulles')} progress={0.33} styles={styles.animationBulles3}/>
        <LottieAnimation source={require('../../assets/animations/intro/bullesV2')} progress={0.5} styles={styles.animationBulles4}/>
        <LottieAnimation source={require('../../assets/animations/intro/bulles')} progress={0.66} styles={styles.animationBulles5}/>



        {/* Texts */}
        <View style={styles.textApparitionContainer}>
          <TextApparition texts={this.texts} durations={textsApparitions} delay={1000} startDelay={2000} styles={{fontSize: 25, color: '#fff'}} />
        </View>

        {/* Button */}
        <Animated.View style={[styles.buttonContainer, {opacity: this.state.buttonOpacity}]}>
          <ButtonWhite text={'Passer l\'introduction'}
                       style={styles.button}
                       source={ImagesList.others.arrowRight}
                       iconLeft={false}
                       onTouch={this._handleButtonWhiteOnTouch}
          />
        </Animated.View>


        {/* Nuage debut*/}
        <LottieAnimation source={require('../../assets/animations/intro/nuages-debut.json')} delay={200} styles={styles.animationNuagesDebut} isLoop={false}/>

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
    backgroundColor: '#fff'
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    // height: windowHeight,
    // width: windowWidth,
  },
  landscape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  button: {
    width: 200,
  },
  textApparitionContainer: {
    position: 'absolute',
    top: '22%',
    left: '50%',
    transform: [{translateX: -250}],
    width: 500,
  },
  animationNuagesDebut: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
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
  },
  animationCascade: {
    position: 'absolute',
    bottom: '6.2%',
    left: '0.5%',
    height: '9%',
    width: '10%',
  },
  animationBulles1: {
    position: 'absolute',
    bottom: '5.5%',
    left: '60%',
    height: '4%',
    width: '5%',
  },
  animationBulles2: {
    position: 'absolute',
    bottom: '5.2%',
    left: '68%',
    height: '4%',
    width: '5%',
  },
  animationBulles3: {
    position: 'absolute',
    bottom: '7%',
    left: '80%',
    height: '3%',
    width: '5%',
  },
  animationBulles4: {
    position: 'absolute',
    bottom: '6.2%',
    left: '86%',
    height: '4%',
    width: '5%',
  },
  animationBulles5: {
    position: 'absolute',
    bottom: '6.2%',
    left: '91%',
    height: '3.5%',
    width: '5%',
  },
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
