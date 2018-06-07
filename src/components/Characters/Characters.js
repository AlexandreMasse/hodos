import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Animated, TouchableHighlight } from 'react-native'
import {connect} from 'react-redux';
import OpenDrawerButton from "../OpenDrawerButton";
import ImageAspectRatio from './../utils/ImageAspectRatio'
import Title from './../Title'
import CardDetection from './../CardDetection/CardDetection'
import LottieAnimation from './../LottieAnimation/LottieAnimation'
import { characterList } from './../../assets/characterList'
import imageList from './../../assets/ImagesList'
import { colors, fonts, stylesSheet } from './../../assets/variables'

class Characters extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      showSkills: true,
      activeCharacter: {}
    }
    this._visibility = new Animated.Value(50)
    this._visibilitySkills = new Animated.Value(0)
  }

  componentWillMount() {
    const lockedCharacters = []
    const unlockedCharacters = []
    this.props.characterList.map(character => {
      character.skills = []
      this.props.skillList.map(skill => {
        if (skill.character == character.id) {
          this.props.skillTypeList.map(skillType => {
            if (skill.type == skillType.id) {
              skill.skillType = skillType
              character.skills.push(skill)
            }
          })
        }
      })
      if (character.isLocked) {
        lockedCharacters.push(character)
      } else {
        unlockedCharacters.push(character)
      }
    })
    this.characters = unlockedCharacters.concat(lockedCharacters)
  }

  _onPatternRecognition (character) {
    console.log('pattern recognized', character)
  }

  _showSkillsAnimation = () => {
    this.setState({
      showInfo: true,
      showSkills: true
    })
    Animated.timing(this._visibilitySkills, {
      toValue: 100,
      duration: 700
    }).start()
  }

  _showCharacterInfosAnimation(character) {
    this.setState({
      showInfo: true,
      showSkills: false,
      activeCharacter: character
    })
    Animated.timing(this._visibility, {
      toValue: 100,
      duration: 300
    }).start()
  }

  _showCharacterInfo(character) {
    if (!this.state.showInfo) {
      this._showCharacterInfosAnimation(character)
    } else {
      Animated.timing(this._visibility, {
        toValue: 0,
        duration: 300
      }).start( () => {
        this._visibilitySkills = new Animated.Value(0)
        this._showCharacterInfosAnimation(character)
      })
    }
  }

  _renderDescription(description) {
    if (description) {
      return description.split('\r\n').map((desc, index) => {
        return <Text key={index} style={[styles.cardText]}>{desc}</Text>
      })
    }
  }

  _renderSkills(skills) {
    if (this.state.showSkills) {
      return skills.map((skill, index) => {
        const skillType = skill.skillType
        return (
          <View key={index} style={[{flexDirection: 'row', alignItems: 'center', marginTop: 15}]}>
            <Image source={imageList.profile.skills[skillType.id]} style={[{width: 45, height: 45, resizeMode: 'contain', marginRight: 15}]} />
            <View>
              <Text style={[styles.characterSkillTypeName]}>{skillType.title} {skillType.name} </Text>
              <Text style={[styles.characterSkillName]}>{skill.name}</Text>
            </View>
          </View>
        )
      })
    }
  }

  _renderCharacterInfo() {
    if (this.state.showInfo && this.state.activeCharacter && characterList.profile[this.state.activeCharacter.id]) {
      return(
        <Animated.View style={[
          styles.characterInfoContainer,
          {opacity: this._visibility.interpolate({
              inputRange: [50, 100],
              outputRange: [0, 1],
            })}
          ]}>
          <View style={[{flexDirection: 'row', height: '100%'}]}>
            <View style={[styles.characterInfoCard]}>
              <Text style={[styles.characterInfoName]}>{this.state.activeCharacter.name}</Text>
              <Text style={[styles.characterInfoRole]}>{this.state.activeCharacter.role}</Text>
              <View style={{marginTop: 15}}>
                {this._renderDescription(this.state.activeCharacter.description)}
              </View>
              <Animated.View style={[
                {opacity: this._visibilitySkills.interpolate({
                  inputRange: [50, 100],
                  outputRange: [0, 1],
                })}
              ]}>
                {this._renderSkills(this.state.activeCharacter.skills)}
              </Animated.View>
              {!this.state.showSkills &&
                <Animated.View style={[
                  {opacity: this._visibilitySkills.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                  })}
                ]}>
                  <Text style={[styles.cardText, {opacity: 0.7, color: colors.grey, marginTop: 30}]}>Pour connaître l’aptitude lié à ce personnage, pose sa carte sur le rectangle grisé.</Text>
                </Animated.View>
              }
            </View>
            <Image source={characterList.profile[this.state.activeCharacter.id]} style={[{width: 250, height: 430, resizeMode: 'contain'}]} />
          </View>
        </Animated.View>
      )
    } else {
      return (
        <Animated.View style={[
          styles.characterInfoContainer,
          {alignItems: 'center', justifyContent: 'center', marginLeft: 100, width: 500},
          {opacity: this._visibility.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1],
            })}
          ]}>
          <LottieAnimation source={require('./../../assets/animations/card-grey.json')} styles={{width: 150, height: 120}} />
          <Text style={styles.infoText}>Pose une carte  dans la zone grisée pour accéder aux informations de l’un de tes personnages rencontré</Text>
        </Animated.View>
      )
    }
  }

  _renderCharacterList() {
    if (this.characters.length) {
      return this.characters.map((character, index) => {
        if (character.role) {
          return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._showCharacterInfo(character)} key={index}>
              <View style={[styles.listCharacterThumbnailWrapper, styles.listThumbnailWrapper]}>
                <View style={[styles.listThumbnailContainer, styles.listCharacterThumbnailWrapper]}>
                {character.isLocked &&
                  <Image source={imageList.others.lock} style={[styles.listThumbnailLocked]} />
                }
                {(!character.isLocked) &&
                  <View style={{position: 'absolute', top: 0, left: 0}}>
                    <ImageAspectRatio width={'100%'} src={characterList.cards[character.id] ? characterList.cards[character.id] : characterList.cards[2]} style={[styles.listThumbnail, styles.listCharacterThumbnailWrapper]} />
                    {/* <ImageAspectRatio width={'100%'} src={characterList.cards[character.id] ? characterList.cards[character.id] : characterList.cards[2]} style={[styles.listThumbnail, styles.listCharacterThumbnailWrapper]} /> */}
                  </View>
                }
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.characterTitle}>
          <Title title="Personnages" subTitle="Dieux, monstres et mortels rencontrés par Hermès" style={styles.title} />
        </View>
        <TouchableHighlight style={{position: 'absolute', top: 0, right: 0, width: 150, height: 150, backgroundColor: 'transparent', zIndex: 300}} onPress={this._showSkillsAnimation} underlayColor={'transparent'}>
          <View />
        </ TouchableHighlight>
        <ScrollView horizontal={true} style={styles.characterScrollView} showsHorizontalScrollIndicator={false} contentInset={{left: 40}} contentOffset={{x: -40}}>{this._renderCharacterList() }</ScrollView>
        <View style={[styles.characterInfoWrapper]}>
          {this._renderCharacterInfo()}
          <View style={stylesSheet.cardDetection}>
            <CardDetection onPatternRecognition={this._onPatternRecognition()} />
            <View style={[{width: 315, height:'95%', position: 'absolute', left: 30, top: 40}]}  pointerEvents= {'none'}>
              <ImageAspectRatio src={imageList.others.cardBack} width={'100%'} />
            </View>
          </View>
        </View>
        <OpenDrawerButton/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 20
  },
  characterTitle: {
    marginTop: 30,
    marginBottom: 20
  },
  characterScrollView: {
    flexGrow: 0,
    flexShrink: 0
  },
  listThumbnailWrapper: {
    width: 120,
    borderRadius: 8,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
  },
  listThumbnailContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 120,
    borderRadius: 8,
  },
  listCharacterThumbnailWrapper: {
    height: 140,
  },
  listThumbnail: {
    width: 120,
    // resizeMode: 'cover',
  },
  listThumbnailLocked: {
    width: 120,
    resizeMode: 'contain',
    height: 60
  },
  characterInfoWrapper: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  infoText: {
    fontSize: 25,
    fontFamily: fonts.RubikRegular,
    textAlign: 'center',
    color: fonts.grey,
    opacity: 0.7
  },
  characterInfoContainer: {
    width: 600,
    height: 430,
    marginLeft: 50,
    marginRight: 30,
    marginBottom: 30,
    marginTop: 40
  },
  characterInfoCard: {
    width: 350,
    marginRight: 30,
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    paddingVertical: 30,
    paddingHorizontal: 35,
  },
  characterInfoName: {
    fontFamily: fonts.RubikMedium,
    textAlign: 'center',
    fontSize: 22,
    color: colors.grey
  },
  characterInfoRole: {
    fontFamily: fonts.RubikRegular,
    textAlign: 'center',
    fontSize: 15,
    color: colors.grey,
    opacity: 0.7
  },
  characterSkillTypeName: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    opacity: 0.5,
    marginBottom: 2
  },
  characterSkillName: {
    color: colors.grey,
    fontFamily: fonts.RubikMedium,
    fontSize: 18
  },
  cardText: {
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    color: colors.grey,
    margin: 2
  },
})

const mapStateToProps = state => {
  return {
    characterList: state.characterList,
    skillList: state.skillList,
    skillTypeList: state.skillTypeList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
