import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux';
import OpenDrawerButton from "../OpenDrawerButton";
import ImageAspectRatio from './../utils/ImageAspectRatio'
import Title from './../Title'
import CardDetection from './../CardDetection/CardDetection'
import { characterList } from './../../assets/characterList'
import imageList from './../../assets/ImagesList'
import { colors, fonts } from './../../assets/variables'

class Characters extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      showSkills: true,
      activeCharacter: {}
    }
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
    console.log(character)
  }

  _showCharacterInfo(character) {
    this.setState({
      showInfo: true,
      activeCharacter: character
    })
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
              <Text style={[styles.skillTypeName]}>{skillType.title} {skillType.name} </Text>
              <Text style={[styles.skillName]}>{skill.name}</Text>
            </View>
          </View>
        )
      })
    } else {
      return (
        <Text style={[styles.cardText]}>Pour connaître l’aptitude lié à ce personnage, pose sa carte sur le rectangle grisé.</Text>
      )
    }
  }

  _renderCharacterInfo() {
    if (this.state.showInfo && this.state.activeCharacter) {
      return(
        <View style={[{flexDirection: 'row'}]}>
          <View style={[styles.card]}>
            <Text style={[styles.characterName]}>{this.state.activeCharacter.name}</Text>
            <Text style={[styles.characterRole]}>{this.state.activeCharacter.role}</Text>
            <View style={{marginTop: 15}}>
              {this._renderDescription(this.state.activeCharacter.description)}
            </View>
            {this._renderSkills(this.state.activeCharacter.skills)}
          </View>
          <ImageAspectRatio src={characterList.profile[this.state.activeCharacter.id]} height={430} style={{ marginLeft: 50}}/>
        </View>
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
                {!character.isLocked &&
                  <View style={{position: 'absolute', top: 0, left: 0}}>
                    <ImageAspectRatio width={'100%'} src={characterList.cards[character.id] ? characterList.cards[character.id] : characterList.cards[2]} style={[styles.listThumbnail, styles.listCharacterThumbnailWrapper]} />
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
        <ScrollView horizontal={true} style={{marginLeft: 60, flexGrow: 0, flexShrink: 0}}>{this._renderCharacterList()}</ScrollView>
        <View style={[styles.infoWrapper]}>
          <View style={[{width: 600, height: 400, marginLeft: 70, marginRight: 30, marginBottom: 30, marginTop: 40}]}>
            {this._renderCharacterInfo()}
          </View>
          <View style={styles.cardDetection}>
            <CardDetection onPatternRecognition={this._onPatternRecognition()} />
            <Text style={styles.cardDetectionText}>Pose une carte pour accéder aux informations de l’un de tes personnages rencontré</Text>
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
  infoWrapper: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',

  },
  cardDetection: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 300,
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lightGrey
  },
  cardDetectionText: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontSize: 14,
    marginVertical: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.grey,
    opacity: 0.8
  },
  card: {
    width: 350,
    marginRight: 50,
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    paddingVertical: 30,
    paddingHorizontal: 35,
  },
  characterName: {
    fontFamily: fonts.RubikMedium,
    textAlign: 'center',
    fontSize: 22,
    color: colors.grey
  },
  characterRole: {
    fontFamily: fonts.RubikRegular,
    textAlign: 'center',
    fontSize: 15,
    color: colors.grey,
    opacity: 0.7
  },
  cardText: {
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    color: colors.grey,
    margin: 2
  },
  skillTypeName: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    opacity: 0.5,
    marginBottom: 2
  },
  skillName: {
    color: colors.grey,
    fontFamily: fonts.RubikMedium,
    fontSize: 18
  }
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
