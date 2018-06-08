import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux';
import PinchZoomView from '../../lib/PinchZoomView'
import Scene from './../Chapter/Scene'
import {colors, stylesSheet} from '../../assets/variables'
import resolveAssetSource from 'resolveAssetSource'
import mapData from './../../store/datas/map.json'
import imageList from '../../assets/ImagesList'
import ButtonWhite from './../ButtonWhite'
import Place from './../Place/Place'
import LottieAnimation from './../LottieAnimation/LottieAnimation'
import OpenDrawerButton from '../OpenDrawerButton'
import { AudioManager} from '../utils/AudioManager'
import SoundsList from './../../assets/SoundsList'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

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
      placeList: []
    }
    this.mapImage = imageList.map.map

    AudioManager.prepareSounds(SoundsList.map).then((data) => {
      this.audio = data
      this.setState({audioLoaded: true})
      this.audio.play.background()
    })
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0);

    const placeList = this.props.placeList.map(place => {
      const chapterList = [];
      const characterList = [];
      let characterIds = [];
      if (place.chapters && place.chapters.length) {
        this.props.chapterList.forEach(chapter => {
          if (place.chapters.indexOf(chapter.id) !== -1) {
            chapterList.push(chapter)
            chapter.characters.forEach(characterId => {
              characterIds.push(characterId)
            })
          }
        })

        characterIds = [ ...new Set(characterIds) ]

        this.props.characterList.forEach(character => {
          if (characterIds.indexOf(character.id) !== -1){
            characterList.push(character)
          }
        })

      }

      return {
        ...place,
        chapters: chapterList,
        characters: characterList
      }
    })
    this.setState({
      placeList: placeList
    })
  }

  componentWillUnmount() {
    console.log('unmount')
    AudioManager.stopSounds(this.audio.sound)
  }

  _handleAnimationOpacity(value, clb) {
    Animated.timing(this._visibility, {
      toValue: value,
      duration: 500
    }).start(() => {
      if (clb) {
        clb()
      }
    })
  }

  _handleReading = () => {
    this.props.navigation.navigate('Previously')
    AudioManager.stopSounds(this.audio.sound)
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
    return(
      <Place place={this.state.activePlace} showPlaceInfo={this.state.showPlaceInfo ? 100 : 0} onBackToMap={this._handleBackToMap} translateY={windowHeight} onReading={this._handleReading} style={styles.placeInfo} />
    )
  }

  _renderReadingButton() {
    if (this.state.showReadingButton) {
      return (
        <View  style={styles.buttonRead} src={imageList.others.arrowRight}>
          <ButtonWhite text={'Reprendre la lecture'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleReading} />
        </View>
      );
    }
  }

  _renderTouchablePlace() {
      return mapData.map((mapPlace, index) => {
        return(
          <TouchableHighlight
            key={'map_'+index}
            onPress={() => {this._showCard(mapPlace)} }
            style={[styles.button, {top: mapPlace.y, left: mapPlace.x, width: mapPlace.width, height: mapPlace.height}]}
            underlayColor={null}>
            <View />
          </TouchableHighlight>
        )
      })
  }

  _renderTouchableIndicator() {
    return mapData.map((mapPlace, index) => {
      if (!this.state.placeList[index].isLocked) {
        if (index === this.props.progress.place) {
          return (
            <TouchableHighlight
              key={'mapIndicator_'+index}
              onPress={() => {this._showCard(mapPlace)} }
              style={[styles.button, {top: (mapPlace.indicator.y - 1.75
              ).toString() + '%', left: (mapPlace.indicator.x - 0.65).toString() + '%', width: 44, height: 44}]}
              underlayColor={null}>
              <LottieAnimation source={require('./../../assets/animations/map-indicator-active.json')} styles={{width: '100%', height: '100%'}} />
            </TouchableHighlight>
          )
        } else {
          return(
            <TouchableHighlight
              key={'mapIndicator_'+index}
              onPress={() => {this._showCard(mapPlace)} }
              style={[styles.button, {top: mapPlace.indicator.y.toString() + '%', left: mapPlace.indicator.x.toString() + '%', width: 16, height: 16}]}
              underlayColor={null}>
              <Image source={imageList.map.mapIndicator} style={{width: 16, height: 16}}/>
            </TouchableHighlight>
          )
        }
      }
    })
  }

  _renderCard () {
    if (this.state.showPlace) {
      return (
        <Animated.View style={[
          styles.cardContainer,
          {
            opacity: this._visibility.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            })
          }
        ]}>
          <TouchableHighlight underlayColor={null} onPress={() => this._hideCard()} style={[styles.closeBtn, {padding: 15}]}>
            <Image source={imageList.others.close} style={{width: 20, height: 20}} />
          </TouchableHighlight>
          <Text style={stylesSheet.title}>{this.state.activePlace.name}</Text>
          <Text style={stylesSheet.subTitle}>{this.state.activePlace.description}</Text>
          <View style={styles.cardButtonContainer}>
            <ButtonWhite text={'Accéder au lieu'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleNavigationPlace} />
          </View>
        </Animated.View>
      )
    }
  }

  _navigateChapter = () => {
    this.props.navigation.navigate('Previously')
    AudioManager.stopSounds(this.audio.sound)
  }

  _showCard = (mapPlace) => {
    var place = {}
    const id = mapPlace.id

    this.state.placeList.map(val => {
      if (val.id == id) {
        place = val;
      }
    })

    this.setState({
      showPlace: true,
      showReadingButton: false,
      activePlace: place
    })

    this._handleAnimationOpacity(100)
  }

  _hideCard = () => {
    this._handleAnimationOpacity(0, this._hideCardOnAnimationCompete)

  }

  _hideCardOnAnimationCompete = () => {
    this.setState({
      showPlace: false,
      showPlaceInfo: false,
      showReadingButton: true
    })
  }

  getMapImageWidth() {
    const originalSize = resolveAssetSource(this.mapImage)
    return (windowHeight / originalSize.height) * originalSize.width
  }

  render () {
    return (
      <View style={styles.container}>
        <PinchZoomView initialScale={2.5} minScale={2} maxScale={3.5} childHeight={windowHeight} childWidth={this.getMapImageWidth()}>
          <Scene src={this.mapImage}/>
          <TouchableHighlight style={styles.mapTouchable} onPress={() => this._hideCard()}  underlayColor={'transparent'}>
            <View />
          </TouchableHighlight>
          { this._renderTouchablePlace() }
          { this._renderTouchableIndicator() }
        </PinchZoomView>
          {this._renderReadingButton()}
        <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
        {this._renderCard()}
        {this._renderPlaceInfo()}
        <OpenDrawerButton/>
      </View>

    )
  }
}

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
  },
  cardContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -350}],
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 700,
    height: 250,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  cardButtonContainer: {
    marginTop: 40,
    width: 200
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  }
})

const mapStateToProps = state => {
  return {
    placeList: state.placeList,
    chapterList: state.chapterList,
    characterList: state.characterList,
    progress: state.progress
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)
