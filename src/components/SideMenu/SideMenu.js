import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import {NavigationActions, DrawerItems} from 'react-navigation'
import imageList from '../../assets/ImagesList'
import { colors, fonts } from './../../assets/variables'
import ProgressBar from './../ProgressBar'

import {LinearGradient} from "expo";
import ButtonWhite from "../ButtonWhite";

class SideMenu extends React.Component {

  constructor(props) {
    super(props)

    let nbUnlockedPlaces = 0
    let nbUnlockedSkills = 0
    let nbUnlockedCharacters = 0
    this.props.placeList.map(place => {
        if (!place.isLocked) {
          nbUnlockedPlaces++
        }
    })
    this.props.skillList.map(skill => {
        if (!skill.isLocked) {
          nbUnlockedSkills++
        }
    })
    this.props.characterList.map(character => {
        if (!character.isLocked) {
          nbUnlockedCharacters++
        }
    })
    this.unlocked = {
      places: nbUnlockedPlaces,
      skills: nbUnlockedSkills,
      characters: nbUnlockedCharacters,
    }
  }

  static propTypes = {
    navigation: PropTypes.object
  }

  _navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _handleLogo = () => {
    this.props.navigation.navigate('HomeScreen')
  }
  _handleClose = () => {
    console.log('close drawer');
    this.props.navigation.navigate('DrawerClose')
  }

  _handleOpen = () => {
    console.log('open drawer');
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    const progressChapterPercent = Math.round(this.props.progress.percent)
    return (
      <View style={styles.container} onLayout={() => console.log('SideMenu : layout')}>
        {/*Top container*/}
        <View style={styles.topContainer}>
          {/*Logo*/}
          <TouchableOpacity onPress={this._handleLogo} style={styles.logoContainer} activeOpacity={0.8}>
            <Image source={imageList.menu.logo} style={styles.logo}/>
          </TouchableOpacity>
          {/*DrawerItems*/}
          <View style={styles.drawerItemsContainer}>
            <DrawerItems {...this.props}/>
          </View>
        </View>

        {/*Separator*/}
        <LinearGradient start={[0, 0]} end={[1, 0]}
                        colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']} style={styles.line}
        />

        {/*Middle container*/}
        <View style={styles.middleContainer}>
          <Text style={styles.readingTitle}>Lecture</Text>
          <View style={styles.readingProgression}>
            <Text style={[styles.readingLabel]}>Chapitre {this.props.progress.chapterRoman}</Text>
            <Text style={[styles.readingLabel, {opacity: 0.5}]}>{progressChapterPercent} %</Text>
          </View>
          <ProgressBar nbSteps={100} progress={progressChapterPercent} height={6} width={240} isHorizontal={true} />
          <View style={{marginTop: 30}}>
            <ButtonWhite text={'Reprendre la lecture'} source={imageList.others.arrowRight} iconLeft={false} onTouch={() => this.props.navigation.navigate('Chapter')}/>
          </View>
        </View>

        {/*Separator*/}
        <LinearGradient start={[0, 0]} end={[1, 0]}
                        colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']} style={styles.line}
        />

        {/*Bottom container*/}
        <View style={styles.bottomContainer}>
          <View style={styles.statsWrapper}>
            <Text style={styles.statsText}>Lieux</Text>
            <Text style={[styles.statsText, styles.statsLabel]}>{this.unlocked.places}/{this.props.placeList.length}</Text>
          </View>
          <View style={styles.statsWrapper}>
            <Text style={styles.statsText}>Personnages</Text>
            <Text style={[styles.statsText, styles.statsLabel]}>{this.unlocked.characters}/{this.props.characterList.length}</Text>
          </View>
          <View style={styles.statsWrapper}>
            <Text style={styles.statsText}>Aptitudes</Text>
            <Text style={[styles.statsText, styles.statsLabel]}>{this.unlocked.skills}/{this.props.skillList.length}</Text>
          </View>
        </View>

        {/*Close*/}
        <TouchableOpacity onPress={this._handleClose} style={styles.closeContainer} activeOpacity={0.8}>
          <Image source={imageList.menu.close} style={styles.close}/>
        </TouchableOpacity>

        {/*Open*/}

        {/*<TouchableOpacity onPress={this._handleOpen} activeOpacity={0.8} style={styles.openContainer}>*/}
          {/*<Image source={imageList.menu.logo} style={styles.open}/>*/}
        {/*</TouchableOpacity>*/}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-between'
  },
  topContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  },
  logo: {
    width: 30,
    height: 30
  },
  drawerItemsContainer: {
    marginTop: 30,
    width: '100%',
  },
  line : {
    width: '100%',
    height: 2,
    marginVertical: 30,
    opacity: 0.5
  },
  middleContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  readingTitle: {
    fontSize: 23,
    fontFamily: fonts.RubikMedium,
    color: colors.lightBlue,
    marginBottom: 20,
  },
  readingLabel: {
    fontSize: 19,
    color: colors.grey
  },
  readingProgression: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  statsWrapper: {
    marginVertical: 7,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  statsText: {
    color: colors.grey,
    fontSize: 16,
    fontFamily: fonts.RubikRegular,
  },
  statsLabel: {
    opacity: 0.5
  },
  closeContainer: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
  },
  close: {
    width: 20,
    height: 20,
  },
 /* openContainer: {
    position:'absolute',
    width: 50,
    height: 50,
    top: 30,
    right: -70,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  open: {
    width: 25,
    height: 25,
  },*/
})

const mapStateToProps = state => {
  return {
    skillList: state.skillList,
    placeList: state.placeList,
    characterList: state.characterList,
    progress: state.progress
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
