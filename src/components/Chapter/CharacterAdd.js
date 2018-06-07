import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight } from 'react-native'
import { fonts, stylesSheet, colors } from './../../assets/variables'
import ButtonWhite from './../ButtonWhite'
import Title from './../Title'
import imageList from './../../assets/ImagesList'
import CardDetection from './../CardDetection/CardDetection'
import { characterList } from './../../assets/characterList'

export default class CharacterAdd extends React.Component {

  static propTypes = {
    nextChapter: PropType.any,
    characterDiscovered: PropType.any,
    skillDiscovered: PropType.any,
    width: PropType.number,
    texts: PropType.array,
    showChapterEnd: PropType.bool
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      showCharacterDiscovered: false,
      title: "Félicitations !",
      subTitle: "Tu as débloqué un nouveau personnage !",
    }
    this._visibility =  new Animated.Value(0)
  }

  componentWillMount() {
    this._visibilityCharacter = new Animated.Value(0)
    this._visibilityInfos = new Animated.Value(100)
    Animated.timing(this._visibility, {
      toValue: 100,
      duration: 1000
    }).start()
  }

  _handleBackToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _handleGoToPreviously = () => {
    this.props.navigation.navigate('Previously')
  }


  // _onPatternRecognition(id) {
  //   if (id === this.props.characterDiscovered.id) {
  //     this._renderAnimation()
  //   }
  // }

  _renderAnimation = () => {
    Animated.timing(this._visibilityInfos, {
      toValue: 0,
      duration: 1000
    }).start(() => {
      this.setState({
        showCharacterDiscovered: true,
        title: this.props.characterDiscovered[0].name,
        subTitle: this.props.characterDiscovered[0].role
      })
      Animated.timing(this._visibilityCharacter, {
        toValue: 100,
        duration: 1000
      }).start()
    })
  }

  _handleGoToPreviously = () => {
    this.props.navigation.navigate('Previously')
  }

  _renderCharacterAddText() {
    if (!this.state.showCharacterDiscovered) {
      return this.props.texts.map((text, index) => {
        return (
          <Text style={{marginBottom: 20, fontSize: 16, fontFamily: fonts.RubikRegular, color: colors.grey}} key={index}>{text}</Text>
        )
      })
    }
  }

  _renderActionButtons() {
    if (this.state.showCharacterDiscovered) {
      return(
        <Animated.View style={[
          { opacity: this._visibilityCharacter.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            }),
            position: 'absolute',
            bottom: 30,
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 50,
          },]}>
          <ButtonWhite text={'Retour au plan'} source={imageList.others.arrowLeft} iconLeft={true} onTouch={this._handleBackToMap}  />
          <ButtonWhite text={'Chapitre suivant'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleGoToPreviously} />
        </Animated.View>
      )
    }
  }

  _renderCharacter() {
    const character = this.props.characterDiscovered[0]
    const skill = this.props.skillDiscovered[0]
    const skillType = skill.skillType
    if (this.state.showCharacterDiscovered) {
      return(
        <Animated.View style={[
          styles.bottomContainer,
          { opacity: this._visibilityCharacter.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            })
          }]}>
            <View style={[styles.contentWrapper, {position: 'absolute', top: 20, width: 400, justifyContent: 'center', alignItems: 'center', paddingBottom: 30}]}>
              <Image source={imageList.profile.skills[skillType.id]} style={{width: 50, height: 50, resizeMode: 'contain'}} />
              <Text style={[styles.cardTitle]}>{skillType.title} {skillType.name}</Text>
              <Text style={[styles.cardSubTitle]}>{skill.name}</Text>
            </View>
            <Image source={characterList.profile[character.id]} style={{marginTop: 150, height: 450, resizeMode: 'contain'}}/>
        </Animated.View>
      )
    }
  }

  _renderCharacterAdd () {
    if (!this.state.showCharacterDiscovered) {
      return(
        <Animated.View style={[
          styles.bottomContainer,
          { opacity: this._visibilityInfos.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            })
          }
        ]}>
          <View style={[styles.contentWrapper, {position: 'absolute', top: 20, width: 500}]}>
          {this._renderCharacterAddText()}
          </View>
          <View style={[stylesSheet.cardDetection, {borderColor: '#fff', borderWidth: 10}]}>
            <CardDetection onPatternRecognition={(id) => {this._onPatternRecognition(id)}} />
            <Text style={stylesSheet.cardDetectionText}>Maintiens la carte du personnage sur cette zone</Text>
            </View>
        </Animated.View>
      )
    }
  }

  render () {
    return (
      <Animated.View style={[
        styles.chapterAddContainer,
        {width: this.props.width},
        {
          opacity: this._visibility.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          })
        }
      ]} >
        <Image source={imageList.chapters.characterAddBackground} style={styles.backgroundImage}/>
        <TouchableHighlight style={{position: 'absolute', top: 0, right: 0, width: 150, height: 150, backgroundColor: 'transparent', zIndex: 300}} onPress={this._renderAnimation} underlayColor={'transparent'}>
          <View />
        </ TouchableHighlight>
        <View style={{marginTop: 70}}>
          <Title title={this.state.title} subTitle={this.state.subTitle} willUpdate={true}>Félicitations !</Title>
          {this._renderCharacterAdd()}
          {this._renderCharacter()}
          {this._renderActionButtons()}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  chapterAddContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 40,
    height: '100%',
    width: '100%',
    backgroundColor: '#dedede'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.RubikMedium
  },
  contentWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    shadowColor: '#b3afbe',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '89%'
  },
  cardTitle: {
    color: '#a9a9aa',
    fontSize: 16,
    fontFamily: fonts.RubikRegular
  },
  cardSubTitle: {
    color: '#424246',
    fontSize: 20,
    marginTop: 4,
    fontFamily: fonts.RubikMedium
  },
})
