import React from 'react'
import {StyleSheet, View, Text, Image, Button, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import ButtonWhite from "../ButtonWhite";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

class Intro extends React.Component {

  _handleButtonWhiteOnTouch = () => {
    this.props.navigation.navigate('MainDrawerNavigator')
  }

  render () {
    return (
      <View style={styles.container}>
        <ButtonWhite text={'Passer l\'introduction'} style={styles.button} hasImage={true} imageLeft={false} onTouch={this._handleButtonWhiteOnTouch}/>
        <LottieAnimation source={require('../../assets/animations/nuages-debut.json')} styles={styles.animation} isLoop={false}/>
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
