import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux'
import { colors, fonts } from './../../assets/variables'
import ButtonWhite from './../ButtonWhite'

class Previously extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chapter: {}
    }
  }

  componentWillMount() {
    var chapter = {}
    // const id = this.props.progress.chapter
    const id = 26

    this.props.chapters.map(val => {
      if (val.id == id) {
        chapter = val;
      }
    })
    this.setState({
      chapter: chapter
    })
  }

  _handleReading = () => {
    this.props.navigation.navigate('Chapter')
  }

  _handleBackToMap = () => {
    this.props.navigation.navigate('Map')
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('./../../assets/images/chapters/previously.png')} style={styles.backgroundImage}/>
        <View style={styles.buttonLeft} src={require('./../../assets/images/arrow-left.png')}>
          <ButtonWhite text={'Retour'} hasImage={true} imageLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View source={styles.menuWrapper}>
          <Image source={require('./../../assets/images/menu.png')} source={styles.menu}/>
        </View>
        <View style={styles.previouslyWrapper}>
          <View>
            <Text style={styles.previouslyNumber}>Chapitre {this.state.chapter.numberRoman}</Text>
            <Text style={styles.previouslyTitle}>{this.state.chapter.title}</Text>
          </View>
          <View style={styles.previouslyContent}>
            <Text style={styles.previouslyInfo}>Résumé de l'épisode précédent :</Text>
            <Text style={styles.previouslyDescription}>{this.state.chapter.previously}</Text>
          </View>
          <View  style={styles.buttonRight} src={require('./../../assets/images/arrow-right.png')}>
            <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={this._handleReading} />
          </View>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  previouslyWrapper: {
    marginTop: '12%',
    backgroundColor: '#fff',
    height: '55%',
    width: '100%',
    alignItems: 'center',
  },
  previouslyNumber: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 32,
    marginTop: 80,
  },
  previouslyTitle: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 15,
    marginTop: 10
  },
  previouslyContent: {
    justifyContent: 'center',
    width: '70%',
    marginTop: 70
  },
  previouslyInfo: {
    textAlign: 'left',
    color: colors.grey,
    fontFamily: fonts.RubikMedium,
    fontSize: 18
  },
  previouslyDescription: {
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 14,
    textAlign: 'left',
    marginTop: 15,
  },
  buttonLeft: {
    position: 'absolute',
    left: 20,
    top: '13%',
    zIndex: 10
  },
  buttonRight: {
    position: 'absolute',
    bottom: -15
  },
  menuWrapper: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'red',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200
  },
  menu: {
    width: 20,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => {
  console.log('Previously : state => ', state.chapterList)
  return {
    progress: state.progress,
    chapters: state.chapterList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Previously)
