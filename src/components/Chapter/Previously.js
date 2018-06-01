import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux'
import { colors, fonts } from './../../assets/variables'
import ButtonWhite from './../ButtonWhite'
import Title from './../Title'
import imageList from "../../assets/ImagesList";
import OpenDrawerButton from "../OpenDrawerButton";

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
        <Image source={imageList.previously.previously} style={styles.backgroundImage}/>
        <View style={styles.buttonLeft} src={imageList.others.arrowLeft}>
          <ButtonWhite text={'Retour'} hasImage={true} imageLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View style={styles.previouslyWrapper}>
          <View style={styles.previouslyTitle}>
            <Title title={'Chapitre '+this.state.chapter.numberRoman}  subTitle={this.state.chapter.title} />
          </View>
          <View style={styles.previouslyContent}>
            <View style={styles.previouslyText}>
              <Text style={styles.previouslyInfo}>Résumé de l'épisode précédent :</Text>
              <Text style={styles.previouslyDescription}>{this.state.chapter.previously}</Text>
            </View>
          </View>
          <View style={styles.buttonRight}>
            <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={this._handleReading} />
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
  },
  previouslyTitle: {
    marginTop: 70,
    marginBottom: 90,
  },
  previouslyContent: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  previouslyText: {
    width: '50%'
  },
  previouslyInfo: {
    textAlign: 'left',
    width: '100%',
    color: colors.grey,
    fontFamily: fonts.RubikMedium,
    fontSize: 18,
  },
  previouslyDescription: {
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
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
    width: '100%',
    alignItems: 'center',
    bottom: -25
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
