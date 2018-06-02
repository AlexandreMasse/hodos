import React from 'react'
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Animated } from 'react-native'
import { connect } from 'react-redux';
import { currentOffsetProgress, setChapterProgress } from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import ButtonWhite from "./../ButtonWhite";
import ChapterEnd from './ChapterEnd'
import imageList from '../../assets/ImagesList'
import OpenDrawerButton from "../OpenDrawerButton";
import Chapter27 from "./datas/chapter27.json";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1,
      totalWidth: 0,
      currentChapter: {},
      nextChapter : {},
      maxScrollX: 0,
      showChapterEnd: false
    }
    this.scrollX = new Animated.Value(0);
  }

  componentWillUnmount() {
    this.props._setCurrentOffsetProgress(this.scrollX._value)
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.chap27_part1)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.scrollTo({x: this.props.currentOffset, animated: true})

    //Retrieves current chapter data in store
    const currentChapterId = 26
    this.props._setProgressChapter(currentChapterId)
    this.props.chapterList.map(val => {
      if (val.id === currentChapterId) {
        this.setState({
          currentChapter: val,
        })
      } else if (val.id === currentChapterId + 1) {
        this.setState({
          nextChapter: val,
        })
      }
    })
  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  _onContentSizeChange = (totalWidth) => {
    this.setState({
      totalWidth: totalWidth,
      maxScrollX: totalWidth - windowWidth
    })
  }

  _handleEndChapter = (scrollX) => {
    if (scrollX === this.state.maxScrollX) {
      this.setState({
        showChapterEnd: true,
      })
    } else if (this.state.showChapterEnd) {
      this.setState({
        showChapterEnd: false,
      })
    }
  }

  _renderScenes () {
    return Chapter27.scenes.map((scene, index) => {
      return (
        <Scene src={imageList.chapters.chapter27[scene.src]} windowHeight={windowHeight} key={index} zIndex={1} />
      )
    })
  }

  _renderParallaxedImages () {
    return Chapter27.parallaxedImage.map((image, index) => {
      const scallingRatio = image.scallingRatio ? this.state.scalingRatio + image.scallingRatio : this.state.scalingRatio
      return (
        <ParallaxedImage left={image.left} bottom={image.bottom || image.bottom >= 0 ? image.bottom : null} top={image.top || image.top >= 0 ? image.top : null} speed={20} scalingRatio={scallingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27[image.src]} zIndex={image.zIndex >= 0 ? image.zIndex : 2 } key={index}/>
      )
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={this._scrollViewRef}
          onContentSizeChange={this._onContentSizeChange}
          horizontal={true}
          style={styles.scrollView}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  x: this.scrollX
                }
              }
            }], {
              listener: event => {
                this._handleEndChapter(event.nativeEvent.contentOffset.x)
              },
            }
        )}>
          {this._renderScenes()}
          <Paragraph text={"C’est un soir d'orage que Zeus et Rhéa décidèrent d'agir contre Cronos. Ce soir-là, l'orage était terriblement violent. Cronos ne cessait d'aller et venir dans sa chambre."} width={900} bottom={'5%'} left={0.003} scrollX={this.scrollX} windowWidth={windowWidth} parentWidth={this.state.totalWidth} />
          {this._renderParallaxedImages()}
        </ScrollView>
        <ChapterEnd width={windowWidth} imageSource={imageList.chapters.chapter28.thumbnail} nextChapter={this.state.nextChapter} showChapterEnd={this.state.showChapterEnd} />
        <View style={styles.absoluteContent}>
          {/*<Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>*/}
        </View>
        <OpenDrawerButton/>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  scrollView: {
    height: '100%',
    width: '100%'
  },
  absoluteContent: {
    top: 20,
    left: 20,
    alignItems: 'flex-start',
    position: 'absolute',
  },
  textTop: {
    fontSize: 30,
    color: 'white'
  },
  textIntro: {
    fontSize: 26,
    color: 'white',
    width: windowWidth * 0.7,
    position: 'absolute',
    left: windowWidth * 0.15,
    bottom: '10%',
    textAlign: 'center',
    zIndex: 3
  }
})

const mapStateToProps = state => {
  return {
    currentOffset: state.progress.currentOffset,
    chapterList: state.chapterList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _setCurrentOffsetProgress: (currentOffset) => {
      dispatch(currentOffsetProgress(currentOffset))
    },
    _setProgressChapter: (chapter) => {
      dispatch(setChapterProgress(chapter))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
