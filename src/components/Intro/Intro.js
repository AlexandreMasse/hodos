import React from 'react'
import {StyleSheet, View, Text, Image, Button, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import ButtonWhite from "../ButtonWhite";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import TextApparition from "./../TextApparition";

class Intro extends React.Component {

  constructor(props){
    super(props)
    this.texts = [
      'Il y a fort longtemps, sur les terres lointaines de la Grèce antique,',
      'régna l’âge d’or des dieux tout-puissants et d’extraordinaires héros.',
      'Nous allons découvrir l’histoire de l’un d’entre eux, au travers d’une aventure à mille et un rebomdissements,',
      'celle d’Hermès, jeune dieu curieux et courageux.'
    ]
  }

  _handleButtonWhiteOnTouch = () => {
    this.props.navigation.navigate('MainDrawerNavigator')
  }

  render () {
    return (
      <View style={styles.container}>
        <ButtonWhite text={'Passer l\'introduction'} style={styles.button} hasImage={true} imageLeft={false} onTouch={this._handleButtonWhiteOnTouch}/>
        <LottieAnimation source={require('../../assets/animations/nuages-debut.json')} styles={styles.animation} isLoop={false}/>
        <TextApparition texts={this.texts} durations={[5200, 4000, 4500, 4000]}  delay={1000} style={{width: 300, backgroundColor:'green'}} styles={{fontSize: 25, color: '#fff'}} />
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
  button: {
    width: 200,
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    width: windowWidth,
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
