import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native'
import {connect} from "react-redux";
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import Title from './../Title'
import CircularSkill from "../Profile/CircularSkill"
import ProgressBar from 'react-native-progress/Bar'
import { LinearGradient } from 'expo'
import imageList from './../../assets/ImagesList'
import progress from "../../store/reducers/progress";


class Profile extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      skillProgress: [],
      activeSkill: {},
      showActiveSkill: false
    }
  }

  _handlePressCard (id) {
    console.log(id);

    this.setState({
      activeSkill: id,
      showActiveSkill: true
    })
  }

  createSkillsArray () {
    let skillProgress = this.props.skillTypeList.map(skillType => {
      return {
        ...skillType,
        skills: [],
        nbUnlocked: 0
      }
    })
    this.props.skillList.map(skill => {
      for (let i = 0; i < skillProgress.length; i++) {
        if (skillProgress[i].id == skill.type) {
          skillProgress[i].skills.push(skill)
          if (!skill.isLocked) {
            skillProgress[i].nbUnlocked++
          }
        }
      }
    })
    this.setState({
      skillProgress: skillProgress
    })
  }

  componentDidMount () {
    this.createSkillsArray()
  }

  _renderCardClose(skillType, index) {
    return (
      <TouchableOpacity style={[styles.card, {}]} key={skillType.id} activeOpacity={0.8} onPress={() => this._handlePressCard(skillType.id)}>
        <View style={[{alignItems: 'center', flexDirection: 'row', width: '100%'}]}>
          <CircularSkill currentSkill={skillType.nbUnlocked} totalSkill={skillType.skills.length} size={110} width={3} img={imageList.profile.skills[index]} animationDelay={1000}/>
          <View style={{marginLeft: 20}}>
            <Text style={[styles.cardTitle]}>{skillType.title}</Text>
            <Text style={[styles.cardSubTitle]}>{skillType.name}</Text>
          </View>
          <LinearGradient start={[0, 0]} end={[1, 0]} colors={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.1)']} style={styles.line} />
        </View>
      </TouchableOpacity>
    )
  }

  _renderCardOpen(skillType, index) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Skill open is : {skillType.name}</Text>
        <Button title={'Close'} onPress={() => this.setState({showActiveSkill: false})}/>
      </View>
    )
  }

  _renderLeft () {
    return this.state.skillProgress.map( (skillType, index) => {
      // if all skills are closed render 2 skills closed
      if(!this.state.showActiveSkill) {
        if(skillType.id <= 1) {
          return this._renderCardClose(skillType, index)
        }
      } else { // if one skill showing render 3 skills closed
        if(skillType.id !== this.state.activeSkill) {
          return this._renderCardClose(skillType, index)
        }
      }
    })
  }

   _renderRight () {
    return this.state.skillProgress.map( (skillType, index) => {
      // if all skills are closed render 2 skills closed
      if(!this.state.showActiveSkill) {
        if(skillType.id >= 2) {
          return this._renderCardClose(skillType, index)
        }
      } else { // if one skill showing render 1 skill opened
        if(skillType.id === this.state.activeSkill) {
          return this._renderCardOpen(skillType, index)
        }
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[{marginTop: '10%'}, styles.profileWrapper]}>
          <View style={styles.titleWrapper}>
            <Title title="Profil" subTitle="Aptitudes et traits de caractère acquis" />
          </View>
          <View style={styles.content}>
            <Image source={imageList.profile.hermes[2]} style={[{width: '35%', height: '100%', resizeMode: 'contain'}]} />
            <View style={styles.skillsContainer}>
              <View style={styles.cardContainer}>
                  <View style={styles.cardWrapperLeft}>
                    {this._renderLeft()}
                  </View>
                  <View style={styles.cardWrapperRight}>
                    {this._renderRight()}
                  </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarTextContainer}>
                  <Text style={styles.progressBarText}>Naissance</Text>
                  <Text style={styles.progressBarText}>Âge adulte</Text>
                </View>
                <ProgressBar progress={0.5} width={null} height={8} borderRadius={4} color='#00a7f5' unfilledColor='rgba(41,41,45,0.1)' borderWidth={0}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dafff2'
  },
  profileWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    height: '90%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  titleWrapper: {
    marginTop: 20
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  skillsContainer: {
    width: '65%',
    paddingVertical: 30,
    paddingRight: 30,
  },
  cardContainer: {
    width: '100%',
    height: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardWrapperLeft: {
    height: '100%',
    width: '48%',
    justifyContent:'center',
  },
  cardWrapperRight: {
    height: '100%',
    width: '48%',
    justifyContent:'center',
  },
  card: {
    position: 'relative',
    width: '100%',
    height: '30%',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e6e6e6',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ceffbf',
    height: '15%',
  },
  progressBarTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    opacity: 0.5,
  },
  progressBarText: {
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
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
  line: {
    position: 'absolute',
    bottom: 10,
    right: -15,
    width: 150,
    height: 1,
  }
})


const mapStateToProps = state => {
  return {
    skillList: state.skillList,
    skillTypeList: state.skillTypeList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
