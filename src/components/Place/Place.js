import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, TouchableOpacity,Dimensions, Animated, ScrollView } from 'react-native'
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import {characterList} from '../../assets/characterList'
import HeaderPlace from './../Map/HeaderPlace'
import PlaceCard from './PlaceCard'
import Title from './../Title'
import ButtonWhite from './../ButtonWhite'
import imageList from './../../assets/ImagesList'
import ImageAspectRatio from './../utils/ImageAspectRatio'
import { withNavigation } from 'react-navigation'

class Place extends React.Component {

  static propTypes = {
    place: PropType.object,
    onBackToMap: PropType.func,
    onReading: PropType.func,
    showPlaceInfo: PropType.number,
    translateY: PropType.number
  }

  static defaultProps = {
    id: null
  }

  constructor(props) {
    super(props)
  }

  _handleBackToMap = () => {
    this.props.onBackToMap()
  }

  _handleReading = () => {
    this.props.onReading()
  }

  _handleNavigationToChapter = (chapterId) => {
    if (Number(chapterId) === 26) {
      this.props.navigation.navigate('Previously', {chapterId: chapterId})
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this._visibility, {
      toValue: nextProps.showPlaceInfo,
      duration: 300
    }).start()
  }

  _renderTabHeader() {
    return (
      <View style={[styles.placeHeaderWrapper]}>
        <View style={styles.buttonLeft} src={imageList.others.arrowLeft}>
          <ButtonWhite text={'Retour au plan'}  source={imageList.others.arrowLeft} iconLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View style={styles.buttonRight} src={imageList.others.arrowRight}>
          <ButtonWhite text={'Reprendre la lecture'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleReading} />
        </View>
        <Title title={this.props.place.name} subTitle={this.props.place.description} style={styles.placeHeader} />
      </View>
    )
  }

  _renderChapterList() {
    if (this.props.place && this.props.place.chapters) {
      return this.props.place.chapters.map(function(chapter, index) {
        const chapterNb = chapter.numberInt
        const chapterImages = imageList.chapters['chapter'+chapterNb]
        console.log(chapterImages)
        if (chapterImages && chapterImages.thumbnail) {
          return (
            <TouchableOpacity  key={index} onPress={ () => {
              // if (Number(chapter.id) === 26) {
              // this.props.navigation.navigate('Previously', {chapterId: chapter.id})
              // }
            }}>
              <View style={[styles.listElement]}>
                <View style={[styles.listThumbnailWrapper,  styles.listChapterThumbnailWrapper]}>
                  <View style={[styles.listThumbnailContainer, styles.listChapterThumbnailWrapper]}>
                    {/* <Image source={chapter.isLocked ? imageList.others.lock : chapterImages.thumbnail} style={[chapter.isLocked ? styles.listThumbnailLocked : styles.listThumbnail, styles.listChapterThumbnailWrapper]} /> */}
                    <Image source={chapterImages.thumbnail} style={[styles.listThumbnail, styles.listChapterThumbnailWrapper]} />
                  </View>
                </View>
                <Text style={[styles.listSubTitle]}>Chapitre {chapter.numberRoman}</Text>
                <Text style={styles.listDescription}>{chapter.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
  }

  _renderCharacterList() {
    if (this.props.place && this.props.place.characters) {
      return this.props.place.characters.map(function(character, index) {
        return (
          <View key={index} style={[styles.listElement]}>
            <View style={[styles.listThumbnailWrapper, styles.listCharacterThumbnailWrapper]}>
              <View style={[styles.listThumbnailContainer, styles.listCharacterThumbnailWrapper]}>
              {console.log(character.name, character.isLocked)}
              {character.isLocked &&
                // <Image source={imageList.others.lock} style={[styles.listThumbnailLocked]} />
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ImageAspectRatio width={45} src={imageList.others.lock} style={[styles.listThumbnail, styles.listCharacterThumbnailWrapper]} />
                </View>
              }
              {!character.isLocked &&
                <View style={{position: 'absolute', top: 0, left: 0}}>
                  <ImageAspectRatio width={'100%'} src={characterList.cards[character.id] ? characterList.cards[character.id] : characterList.cards[2]} style={[styles.listThumbnail, styles.listCharacterThumbnailWrapper]} />
                </View>
              }
              </View>
            </View>
            <Text style={[styles.listSubTitle, styles.listCharacterSubtitle]}>{character.name}</Text>
          </View>
        )
      })
    }
  }

  render () {
    const showPlaceInfo = this.props.showPlaceInfo
    return (
      <Animated.View style={[styles.animatedContainer,
        {
          opacity: this._visibility.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
          transform: [{
            translateY: this._visibility.interpolate({
              inputRange: [0, 100],
              outputRange: [this.props.translateY, 0]
            }),
          }],
        }
      ]}>
        <TouchableHighlight style={styles.backToMapZone} onPress={this._handleBackToMap} underlayColor={"transparent"}>
          <View />
        </TouchableHighlight>
        <View style={styles.container}>
          <View style={[styles.placeWrapper]}>
            {this._renderTabHeader()}
            <View style={[styles.placeContent, {marginTop: -15}]}>
              <View>
                <Text style={styles.listTitle}>Chapitres</Text>
                <ScrollView horizontal={true} style={styles.listContent} showsHorizontalScrollIndicator={false} contentInset={{left: 50}} contentOffset={{x: -50}}>
                  {this._renderChapterList()}
                </ScrollView>
              </View>
              <View>
                <Text style={styles.listTitle}>Personnages</Text>
                <ScrollView horizontal={true} style={styles.listContent} showsHorizontalScrollIndicator={false} contentInset={{left: 50}} contentOffset={{x: -50}}>
                {this._renderCharacterList()}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  backToMapZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '88%',
    marginTop: '10%',
    shadowColor: '#000',
    shadowOffset: { width: -1, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  placeHeader: {
    marginTop: 20,
    marginBottom: 20
  },
  placeWrapper: {
    // marginLeft: 50,
    marginLeft: 0,
    marginBottom: 70,
    height: '100%',
  },
  placeHeaderWrapper: {
    width: '100%',
    marginTop: 30,
  },
  listElement: {
    width: 180,
    flexWrap: 'wrap',
    marginRight: 20,
    marginBottom: 0,
    borderRadius: 10,
    shadowColor: '#c8cbce',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  listTitle: {
    marginLeft: 50,
    fontFamily: fonts.RubikMedium,
    fontSize: 30,
    marginBottom: 15,
  },
  listSubTitle: {
    fontFamily: fonts.RubikMedium,
    fontSize: 22,
    marginTop: 10
  },
  listDescription: {
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  listThumbnailWrapper: {
    width: 180,
    borderRadius: 8,
    shadowColor: '#c8cbce',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.3,
  },
  listThumbnailContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 180,
    borderRadius: 8,
  },
  listChapterThumbnailWrapper: {
    height: 120,
  },
  listCharacterThumbnailWrapper: {
    height: 200,
  },
  listThumbnail: {
    width: 180,
    resizeMode: 'cover',
    backgroundColor: 'green',
  },
  listThumbnailLocked: {
    width: 35,
    resizeMode: 'contain',
    height: 35
  },
  listCharacterSubtitle: {
    textAlign: 'center'
  },
  buttonLeft: {
    position: 'absolute',
    top: -50,
    left: 50
  },
  buttonRight: {
    position: 'absolute',
    top: -50,
    right: 50
  }
})

export default withNavigation(Place)
